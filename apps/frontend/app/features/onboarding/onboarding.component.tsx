import { Link } from '@remix-run/react';
import { AlertCircle, CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import type { StepState } from './onboarding.store';

import { Button } from '~/components/ui/button';
import { useGlobalStore } from '~/stores/root.provider';

export const Onboarding = observer(() => {
  const { onboardingStore: store } = useGlobalStore();

  const getStepIcon = (state: StepState): JSX.Element => {
    const color = getColor(state);
    switch (state) {
      case 'SUCCESS':
        return <CheckCircle2 className={`w-5 h-5 ${color}`} />;
      case 'ALREADY_EXISTS':
        return <AlertCircle className={`w-5 h-5 ${color}`} />;
      case 'ERROR':
        return <XCircle className={`w-5 h-5 ${color}`} />;
      case 'IN_PROGRESS':
        return <Loader2 className={`w-5 h-5 ${color} animate-spin`} />;
      default:
        return <Circle className={`w-5 h-5 ${color}`} />;
    }
  };

  const getColor = (state: StepState): string => {
    switch (state) {
      case 'SUCCESS':
        return 'text-green-500';
      case 'ALREADY_EXISTS':
        return 'text-blue-500';
      case 'ERROR':
        return 'text-red-500';
      case 'IN_PROGRESS':
        return 'text-blue-500';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Setup de votre projet</h2>
        <p>Nous avons besoin de configurer votre projet via votre compte GMail.</p>

        <ul className="space-y-2">
          {store.steps.map((step, index) => (
            <li key={index} className="flex items-center gap-2">
              {getStepIcon(step.state)}
              <div className="flex flex-col">
                <span>{step.label}</span>
                {step.message !== undefined && (
                  <span className={getColor(step.state)}>{step.message}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        {store.isComplete ? (
          <Button>
            <Link to="/dashboard">Voir le tableau de bord 🎉</Link>
          </Button>
        ) : (
          <Button disabled={!store.canProcess} onClick={store.load}>
            Configurer mon projet
          </Button>
        )}
      </div>
    </div>
  );
});
