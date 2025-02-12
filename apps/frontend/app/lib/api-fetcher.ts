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
  authGoogle: 'auth/google',
  authLogout: 'auth/logout',
} as const;

export function getApiUrl(endpoint: ApiEndpoint): string {
  const apiUrl = import.meta.env.PUBLIC_API_URL;

  if (apiUrl === undefined) {
    throw new Error('PUBLIC_API_URL environment variable is not set');
  }

  return `${apiUrl}/${endpoint}`;
}
