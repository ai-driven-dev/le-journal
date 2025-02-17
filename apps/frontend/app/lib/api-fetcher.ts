export type Endpoint =
  | '/api/users'
  | '/api/users/me'
  // newsletters
  | '/api/newsletters'
  | '/api/newsletters/emails'
  | '/api/newsletters/emails/search'
  // projects
  | '/api/projects'
  | '/api/projects/create'
  | '/api/projects/prompt'
  | '/api/projects/setup/label'
  // auth
  | '/auth/google'
  | '/auth/logout'
  | '/auth/refresh';

export function getGoogleRedirectURI(): string {
  const authUrl = import.meta.env.GOOGLE_REDIRECT_URI_FULL;

  if (authUrl === undefined || authUrl === '') {
    throw new Error('GOOGLE_REDIRECT_URI environment variable is not set');
  }

  return authUrl;
}

export function getBackendURL(endpoint: Endpoint): string {
  const apiUrl = import.meta.env.PUBLIC_API_URL;

  if (apiUrl === undefined || apiUrl === '') {
    throw new Error('PUBLIC_API_URL environment variable is not set');
  }

  return `${apiUrl}${endpoint}`;
}
