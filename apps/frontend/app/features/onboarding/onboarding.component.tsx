import { observer } from 'mobx-react-lite';

import { AuthComponent } from '../auth/auth.component';

import { StepProgression } from './onboarding-progress.component';
import type { OnboardingStep } from './onboarding.types';
import { OnboardingStepFinished } from './steps/onboarding-step-finished.component';
import { OnboardingStepPermission } from './steps/onboarding-step-permissions.component';
import { OnboardingStepReadonly } from './steps/onboarding-step-readonly.component';
import { OnboardingStepWelcome } from './steps/onboarding-step-welcome.component';
import { OnboardingStore } from './stores/onboardingStore';

type StepFormProps = {
  currentStep: OnboardingStep;
};

export const Onboarding = observer(({ currentStep }: StepFormProps) => {
  const getStepComponent = (): React.ReactNode => {
    switch (currentStep) {
      case 'permissions':
        return <OnboardingStepPermission store={onboardingStore} />;
      case 'readonly':
        return <OnboardingStepReadonly store={onboardingStore} />;
      case 'finished':
        return <OnboardingStepFinished store={onboardingStore} />;
      case 'welcome':
        return <OnboardingStepWelcome store={onboardingStore} />;
      default:
        throw new Error(`Step ${currentStep} not found`);
    }
  };

  const onboardingStore = new OnboardingStore(currentStep);
  const StepComponent = getStepComponent();

  const view = (
    <div className="max-w-2xl mx-auto">
      <StepProgression store={onboardingStore} />

      {StepComponent}
    </div>
  );

  // no need to check auth for welcome step
  if (currentStep === 'welcome') {
    return view;
  }

  return <AuthComponent>{view}</AuthComponent>;
});
