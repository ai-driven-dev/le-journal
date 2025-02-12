import { ApiError } from './api-error';
import { getApiUrl, type ApiEndpoint } from './api-fetcher';

interface FetcherConfig {
  endpoint: ApiEndpoint;
  init?: RequestInit;
  searchParams?: Record<string, string>;
  headers: Headers;
}

export async function serverFetch<T>({
  endpoint,
  init,
  searchParams,
  headers,
}: FetcherConfig): Promise<T> {
  let url = getApiUrl(endpoint);

  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(`API request failed for ${endpoint}`, {
      url,
      method: init?.method,
      statusCode: response.status,
      statusText: response.statusText,
      responseBody: data,
    });
  }

  return data;
}
