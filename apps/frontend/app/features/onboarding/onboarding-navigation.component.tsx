import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import type { OnboardingStore } from './stores/onboardingStore';


export const StepNavigation = observer(({ store }: { store: OnboardingStore }) => {
  const { navigationStore } = store;

  const { nextStep, previousStep, canNavigateBack, canNavigateForward, getStepLabel } =
    navigationStore;

  const previousLink = `/onboarding/${previousStep}`;
  const nextLink = `/onboarding/${nextStep}`;

  const nextLabel = getStepLabel(nextStep);
  const previousLabel = getStepLabel(previousStep);

  return (
    <div className="flex justify-between mt-8">
      {/* {canNavigateBack && (
        <Link to={previousLink} className="px-4 py-2 bg-gray-200 rounded">
          Précédent : {previousLabel}
        </Link>
      )} */}

      {canNavigateForward && (
        <Link to={nextLink} className="px-4 py-2 bg-blue-500 text-white rounded">
          Suivant : {nextLabel}
        </Link>
      )}
    </div>
  );
});
