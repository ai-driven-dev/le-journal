import { ApiError } from './error';

type ApiEndpoint =
  | 'users'
  | 'projects'
  | 'newsletters'
  | 'newsletters/emails'
  | 'newsletters/emails/search';

export const API_ROUTES = {
  users: 'users',
  projects: 'projects',
  newsletters: 'newsletters',
  newsletterEmails: 'newsletters/emails',
  newsletterEmailsSearch: 'newsletters/emails/search',
} as const;

interface FetcherConfig {
  endpoint: ApiEndpoint;
  init?: RequestInit;
  searchParams?: Record<string, string>;
}

function getApiUrl(): string {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error('API_URL environment variable is not set');
  }
  return apiUrl;
}

export async function apiFetch<T>({ endpoint, init, searchParams }: FetcherConfig): Promise<T> {
  const apiUrl = getApiUrl();
  let url = `${apiUrl}/${endpoint}`;

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
