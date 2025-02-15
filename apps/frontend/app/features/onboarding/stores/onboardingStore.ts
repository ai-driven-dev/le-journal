import { makeAutoObservable } from 'mobx';

import type { OnboardingStep } from '../onboarding.types';

import { OnboardingNavigationStore } from './onboarding-navigation.store';

export class OnboardingStore {
  navigationStore: OnboardingNavigationStore;

  constructor(private readonly currentStep: OnboardingStep) {
    makeAutoObservable(this);
    this.navigationStore = new OnboardingNavigationStore(currentStep);
  }
}
