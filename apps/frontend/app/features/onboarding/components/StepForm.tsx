import { observer } from 'mobx-react-lite';
import type { ComponentType } from 'react';

import { onboardingStore, type OnboardingStep } from '../stores/onboardingStore';

import { StepNavigation } from './StepNavigation';
import { StepProgression } from './StepProgression';
import { StepFinish, StepPermissions, StepSetup, StepWelcome } from './steps';

type StepFormProps = {
  currentStep: OnboardingStep;
};

export const StepForm = observer(({ currentStep }: StepFormProps) => {
  // Initialiser le step via l'action du store
  onboardingStore.navigateToStep(currentStep);

  const getStepComponent = (): ComponentType => {
    switch (currentStep) {
      case '':
      case 'welcome':
        return StepWelcome;
      case 'permissions':
        return StepPermissions;
      case 'setup':
        return StepSetup;
      case 'finish':
        return StepFinish;
      default:
        return StepWelcome;
    }
  };

  const StepComponent = getStepComponent();

  return (
    <div className="max-w-2xl mx-auto">
      <StepProgression />

      <StepComponent />

      <StepNavigation />
    </div>
  );
});
