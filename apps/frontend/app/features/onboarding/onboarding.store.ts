import { makeAutoObservable } from 'mobx';

import type { AuthStore } from '../auth/auth.store';

export class OnboardingStore {
  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
  }

  configureGoogleAccount(): void {
    console.log('configureGoogleAccount');
  }
}
