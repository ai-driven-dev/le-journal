import { makeAutoObservable } from 'mobx';

import type { OnboardingStep } from '../onboarding.types';
import { ONBOARDING_STEPS } from '../onboarding.types';

export class OnboardingNavigationStore {
  constructor(private readonly currentStep: OnboardingStep) {
    makeAutoObservable(this);
  }

  get progress(): number {
    return ((ONBOARDING_STEPS.indexOf(this.currentStep) + 1) / ONBOARDING_STEPS.length) * 100;
  }

  get currentStepInfo(): { current: number; total: number } {
    const currentIndex = ONBOARDING_STEPS.indexOf(this.currentStep);
    return {
      current: currentIndex === -1 ? 1 : currentIndex + 1,
      total: ONBOARDING_STEPS.length,
    };
  }
}
