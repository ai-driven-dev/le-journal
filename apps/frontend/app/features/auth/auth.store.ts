import type { User } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import { getApiUrl, getAuthUrl } from '~/lib/api-fetcher';

export class AuthStore {
  user: User | null = null;
  isLoading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // Computed
  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  async login(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      window.location.href = getAuthUrl('readonly');
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      window.location.href = getAuthUrl('full');
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      await fetch(getApiUrl('auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });

      runInAction(() => {
        this.user = null;
      });

      window.location.href = '/';
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

// Singleton pattern
export const authStore = new AuthStore();
