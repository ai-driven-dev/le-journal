export type ApiEndpoint =
  | 'users'
  | 'projects'
  | 'newsletters'
  | 'newsletters/emails'
  | 'newsletters/emails/search'
  | 'projects/prompt'
  | 'auth/google'
  | 'auth/logout';

export const API_ROUTES_PUT = {
  projects: 'projects/prompt',
} as const;

export const API_ROUTES_GET = {
  users: 'users',
  projects: 'projects',
  newsletters: 'newsletters',
  newsletterEmails: 'newsletters/emails',
  newsletterEmailsSearch: 'newsletters/emails/search',
  authLogout: 'auth/logout',
} as const;

export function getAuthUrl(): string {
  const authUrl = import.meta.env.GOOGLE_REDIRECT_URI;

  if (authUrl === undefined || authUrl === '') {
    throw new Error('GOOGLE_REDIRECT_URI environment variable is not set');
  }

  return authUrl;
}

export function getApiUrl(endpoint: ApiEndpoint): string {
  const apiUrl = import.meta.env.PUBLIC_API_URL;

  if (apiUrl === undefined || apiUrl === '') {
    throw new Error('PUBLIC_API_URL environment variable is not set');
  }

  return `${apiUrl}/${endpoint}`;
}
