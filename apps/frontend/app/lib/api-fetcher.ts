import { ApiError } from './api-error';

export type AuthEndpoint = '/auth/google' | '/auth/logout' | '/auth/refresh';
export type ApiEndpoint =
  | '/api/users'
  | '/api/projects'
  | '/api/newsletters'
  | '/api/newsletters/emails'
  | '/api/newsletters/emails/search'
  | '/api/projects/prompt';

export const API_ROUTES_PUT = {
  projects: '/api/projects/prompt',
} as const;

export const API_ROUTES_GET = {
  // auth
  authRefresh: '/auth/refresh',
  authLogout: '/auth/logout',
  // api
  users: '/api/users',
  projects: '/api/projects',
  newsletters: '/api/newsletters',
  newsletterEmails: '/api/newsletters/emails',
  newsletterEmailsSearch: '/api/newsletters/emails/search',
} as const;

export function getGoogleRedirectURI(scope: 'readonly' | 'full'): string {
  const authUrl =
    scope === 'readonly'
      ? import.meta.env.GOOGLE_REDIRECT_URI_READONLY
      : import.meta.env.GOOGLE_REDIRECT_URI_FULL;

  if (authUrl === undefined || authUrl === '') {
    throw new Error('GOOGLE_REDIRECT_URI environment variable is not set');
  }

  return authUrl;
}

export function getBackendURL(endpoint: ApiEndpoint | AuthEndpoint): string {
  const apiUrl = import.meta.env.PUBLIC_API_URL;

  if (apiUrl === undefined || apiUrl === '') {
    throw new Error('PUBLIC_API_URL environment variable is not set');
  }

  return `${apiUrl}${endpoint}`;
}

export interface ApiFetcherConfig {
  endpoint: ApiEndpoint;
  init?: RequestInit;
  searchParams?: Record<string, string>;
  headers?: Headers;
}

export async function apiFetch<T>({
  endpoint,
  init,
  searchParams,
  headers = new Headers(),
}: ApiFetcherConfig): Promise<T> {
  let url = getBackendURL(endpoint);

  if (searchParams !== undefined) {
    const params = new URLSearchParams(searchParams);
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    ...init,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (response.status === 401) {
    window.location.href = '/login';
  }

  if (!response.ok) {
    throw new ApiError(`Erreur lors de la requête API pour ${endpoint}`, {
      url,
      method: init?.method,
      statusCode: response.status,
      statusText: response.statusText,
      responseBody: data,
    });
  }

  return data;
}
