import { makeAutoObservable } from 'mobx';

import type { AuthStore } from '~/features/auth/auth.store';
import { DashboardStore } from '~/features/dashboard/dashboard.store';
import { OnboardingStore } from '~/features/onboarding/onboarding.store';

export class GlobalStore {
  authStore: AuthStore;
  _onboardingStore: OnboardingStore | null = null;
  _dashboardStore: DashboardStore | null = null;

  constructor(authStore: AuthStore) {
    makeAutoObservable(this);
    this.authStore = authStore;
  }

  initOnboardingStore(): void {
    this._dashboardStore = null;
    this._onboardingStore = new OnboardingStore(this.authStore);
  }

  initDashboard(): void {
    this._onboardingStore = null;
    this._dashboardStore = new DashboardStore(this.authStore);
  }

  get dashboardStore(): DashboardStore {
    if (this._dashboardStore === null) {
      this.initDashboard();
    }

    return this._dashboardStore!;
  }

  get onboardingStore(): OnboardingStore {
    if (this._onboardingStore === null) {
      this.initOnboardingStore();
    }

    return this._onboardingStore!;
  }
}
