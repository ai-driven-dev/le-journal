import { getBackendURL, type Endpoint } from './api-fetcher';

type FetchResponse<T> = Response & {
  data: T;
};

export async function clientFetch<T>(
  endpoint: Endpoint,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  accessToken?: string,
  data?: Record<string, unknown>,
  searchParams?: Record<string, string>,
  options?: RequestInit,
): Promise<Response> {
  let init: RequestInit = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }),
    credentials: 'include',
    ...options,
  };

  if (data) {
    init.body = JSON.stringify(data);
  }

  let url = getBackendURL(endpoint as Endpoint);

  if (searchParams !== undefined) {
    const params = new URLSearchParams(searchParams);
    url += `?${params.toString()}`;
  }

  let response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    console.warn('[API] Network error while fetching', error);
    throw new Error(`Network error while fetching ${url}: ${error}`);
  }

  if (response.status === 429) {
    throw new Error('Rate limit exceeded');
  }

  return response as FetchResponse<T>;
}
