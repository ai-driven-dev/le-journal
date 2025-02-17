import type { User } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import { getBackendURL, type Endpoint } from '~/lib/api-fetcher';
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

        const res = await clientFetch('/auth/refresh', 'GET');

        if (res.status === 401) {
          window.location.href = '/login';
        }

        const data = await res.json();

        if (data === null || !('accessToken' in data)) {
          throw new Error('Access token is null', { cause: res });
        }

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

  async fetchWithAuth(
    endpoint: Endpoint,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    form?: React.FormEvent<HTMLFormElement>,
    searchParams?: Record<string, string>,
  ): Promise<Response> {
    if (this.accessToken === null) {
      await this.refreshAccessToken();
    }

    if (this.accessToken === null) {
      throw new Error('Access token is null');
    }

    const res = await clientFetch(endpoint, method, this.accessToken, form, searchParams);

    if (res.status === 401) {
      await this.refreshAccessToken();
      return await this.fetchWithAuth(endpoint, method, form, searchParams);
    }

    return res;
  }

  async logout(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;

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
