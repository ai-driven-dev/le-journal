import type { User } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import {
  API_ROUTES_GET,
  getBackendURL,
  getGoogleRedirectURI,
  type ApiEndpoint,
} from '~/lib/api-fetcher';
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
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = new Promise<void>(async (resolve) => {
      try {
        runInAction(() => {
          this.isLoading = true;
          this.error = null;
        });

        try {
          const res = await clientFetch<{ accessToken: string }>(API_ROUTES_GET.authRefresh, 'GET');

          if (res.error) {
            throw new Error(res.errorMessage);
          }

          runInAction(() => {
            this.accessToken = res.data.accessToken;
          });
        } catch (error) {
          console.warn('[Auth] Erreur lors du refresh token', error);
          window.location.href = '/login';

          runInAction(() => {
            this.accessToken = null;
            this.error = error as Error;
          });
        }
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

  async fetchWithAuth<T>(
    endpoint: ApiEndpoint,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    form?: React.FormEvent<HTMLFormElement>,
    searchParams?: Record<string, string>,
  ): Promise<T> {
    if (this.accessToken === null) {
      // Not a big deal, we'll try to refresh the access token
      await this.refreshAccessToken();

      // If the access token is still null, redirect to the login page
      if (this.accessToken === null) {
        window.location.href = '/login';
        throw new Error('Access token is null');
      }
    }

    const res = await clientFetch<T>(endpoint, method, this.accessToken, form, searchParams);

    if (res.error) {
      if (res.response.status === 401) {
        await this.refreshAccessToken();
        return await this.fetchWithAuth(endpoint, method, form, searchParams);
      }

      throw new Error(res.errorMessage);
    }

    return res.data;
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