import type { User } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import type { ApiEndpoint } from '~/lib/api-fetcher';
import { API_ROUTES_GET, getBackendURL, getGoogleRedirectURI } from '~/lib/api-fetcher';
import { clientFetch } from '~/lib/api-fetcher.client';

export class AuthStore {
  user: User | null = null;
  isLoading = false;
  error: Error | null = null;

  accessToken: string | null = null;

  private refreshPromise: Promise<void> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async refreshAccessToken(): Promise<void> {
    console.log('[Auth] Refresh access token');

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = new Promise<void>(async (resolve) => {
      try {
        runInAction(() => {
          this.isLoading = true;
          this.error = null;
        });

        const res = await clientFetch(API_ROUTES_GET.authRefresh, 'GET');

        if (res.status === 401) {
          console.warn('[Auth] Refresh token expiré, redirection vers /login');
          this.accessToken = null;
          window.location.href = '/login';
          return;
        }

        const data = await res.json();

        console.log('[Auth] Access token', data);

        runInAction(() => {
          this.accessToken = data.accessToken;
        });
      } catch (error) {
        console.error('[Auth] Erreur lors du refresh token', error);
        runInAction(() => {
          this.accessToken = null;
          this.error = error as Error;
        });
      } finally {
        runInAction(() => {
          this.isLoading = false;
          this.refreshPromise = null;
        });
        resolve();
      }
    });

    return this.refreshPromise;
  }
  // Computed
  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  async fetchWithAuth<T>(
    endpoint: ApiEndpoint,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    form?: React.FormEvent<HTMLFormElement>,
    searchParams?: Record<string, string>,
  ): Promise<T> {
    if (this.accessToken === null) {
      await this.refreshAccessToken();

      if (this.accessToken === null) {
        throw new Error('Access token is null');
      }
    }

    const res = await clientFetch(endpoint, method, this.accessToken, form, searchParams);

    if (res.status === 401) {
      await this.refreshAccessToken();
      return await this.fetchWithAuth(endpoint, method, form, searchParams);
    }

    return await res.json();
  }

  async login(): Promise<void> {
    window.location.href = getGoogleRedirectURI('readonly');
  }

  async register(): Promise<void> {
    window.location.href = getGoogleRedirectURI('full');
  }

  async logout(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      await fetch(getBackendURL('/auth/logout'), {
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

let authStore: AuthStore | null = null;

if (authStore === null) {
  authStore = new AuthStore();
}

export default authStore;