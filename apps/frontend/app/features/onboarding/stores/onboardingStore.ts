import { makeAutoObservable } from 'mobx';

import { OnboardingNavigationStore } from './onboardingNavigationStore';

export class OnboardingStore {
  navigationStore: OnboardingNavigationStore;

  constructor() {
    makeAutoObservable(this);
    this.navigationStore = new OnboardingNavigationStore();
  }
}
