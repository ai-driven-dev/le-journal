import { ApiError } from './error';

type ApiEndpoint =
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

interface FetcherConfig {
  endpoint: ApiEndpoint;
  init?: RequestInit;
  searchParams?: Record<string, string>;
}

export function getApiUrl(endpoint: ApiEndpoint): string {
  const apiUrl = import.meta.env.PUBLIC_API_URL;
  if (apiUrl === undefined) {
    throw new Error('PUBLIC_API_URL environment variable is not set');
  }
  console.log('apiUrl', apiUrl);
  return `${apiUrl}/${endpoint}`;
}

export async function apiFetch<T>({ endpoint, init, searchParams }: FetcherConfig): Promise<T> {
  let url = getApiUrl(endpoint);

  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    url += `?${params.toString()}`;
  }

  const method = init?.method || 'GET';
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(`API request failed for ${endpoint}`, {
      url,
      method,
      statusCode: response.status,
      statusText: response.statusText,
      responseBody: data,
    });
  }

  return data;
}
