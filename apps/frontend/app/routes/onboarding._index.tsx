import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import { type ReactNode } from 'react';

import { StepForm } from '~/features/onboarding/components/StepForm';
import { onboardingStore } from '~/features/onboarding/stores/onboardingStore';

const OnboardingAlreadyDone = observer(function OnboardingAlreadyDone(): ReactNode {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h3 className="text-lg font-medium text-blue-900 mb-2">
        Vous avez déjà configuré votre journal
      </h3>
      <p className="text-blue-700 mb-4">
        Vous pouvez soit recommencer la configuration, soit retourner à votre tableau de bord.
      </p>
      <div className="space-x-4">
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retour au tableau de bord
        </Link>
        <button
          onClick={() => onboardingStore.resetOnboarding()}
          className="px-4 py-2 text-blue-600 hover:text-blue-700"
        >
          Recommencer la configuration
        </button>
      </div>
    </div>
  );
});

const OnboardingWelcome = observer(function OnboardingWelcome(): ReactNode {
  return (
    <>
      <p className="text-lg">
        Le Journal est votre espace personnel pour écrire, réfléchir et organiser vos pensées. Nous
        allons vous aider à configurer votre compte et personnaliser votre expérience.
      </p>

      <StepForm currentStep="welcome" />
    </>
  );
});

export default observer(function OnboardingIndex(): ReactNode {
  return onboardingStore.isCompleted ? <OnboardingAlreadyDone /> : <OnboardingWelcome />;
});
