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
