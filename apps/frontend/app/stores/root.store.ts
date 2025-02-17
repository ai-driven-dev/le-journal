import { makeAutoObservable } from 'mobx';

import type { AuthStore } from '~/features/auth/auth.store';
import { DashboardStore } from '~/features/dashboard/dashboard.store';
import { OnboardingStore } from '~/features/onboarding/onboarding.store';

export class GlobalStore {
  authStore: AuthStore;
  onboardingStore: OnboardingStore;
  dashboardStore: DashboardStore;

  constructor(authStore: AuthStore) {
    this.authStore = authStore;
    this.onboardingStore = new OnboardingStore(authStore);
    this.dashboardStore = new DashboardStore(authStore);
    makeAutoObservable(this);
  }
}
