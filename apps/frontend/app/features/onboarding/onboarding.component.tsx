import { observer } from 'mobx-react-lite';
import type { ComponentType } from 'react';

import { AuthComponent } from '../auth/auth.component';

import { StepNavigation } from './onboarding-navigation.component';
import { StepProgression } from './onboarding-progress.component';
import { OnboardingStepFinished } from './steps/onboarding-step-finished.component';
import { OnboardingStepPermission } from './steps/onboarding-step-permissions.component';
import { OnboardingStepReadonly } from './steps/onboarding-step-readonly.component';
import { OnboardingStepWelcome } from './steps/onboarding-step-welcome.component';
import type { OnboardingStep } from './stores/onboardingNavigationStore';
import { OnboardingStore } from './stores/onboardingStore';

type StepFormProps = {
  currentStep: OnboardingStep;
};

export const Onboarding = observer(({ currentStep }: StepFormProps) => {
  const onboardingStore = new OnboardingStore();
  onboardingStore.navigationStore.navigateToStep(currentStep);

  const getStepComponent = (): ComponentType => {
    switch (currentStep) {
      case 'permissions':
        return OnboardingStepPermission;
      case 'setup':
        return OnboardingStepReadonly;
      case 'finish':
        return OnboardingStepFinished;
      case 'welcome':
        return OnboardingStepWelcome;
      default:
        throw new Error(`Step ${currentStep} not found`);
    }
  };

  const StepComponent = getStepComponent();

  const view = (
    <div className="max-w-2xl mx-auto">
      <StepProgression store={onboardingStore} />

      <StepComponent />

      <StepNavigation store={onboardingStore} />
    </div>
  );

  // no need to check auth for welcome step
  if (currentStep === 'welcome') {
    return view;
  }

  return <AuthComponent>{view}</AuthComponent>;
});
