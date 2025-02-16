import type { AuthEndpoint } from './api-fetcher';
import { getBackendURL, type ApiEndpoint } from './api-fetcher';

type FetchResponse<T> =
  | {
      error: false;
      data: T;
    }
  | {
      error: true;
      errorMessage: string;
      data: null;
      response: Response;
    };

export async function clientFetch<T>(
  endpoint: ApiEndpoint | AuthEndpoint,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  accessToken?: string,
  form?: React.FormEvent<HTMLFormElement>,
  searchParams?: Record<string, string>,
  options?: RequestInit,
): Promise<FetchResponse<T>> {
  let init: RequestInit = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }),
    credentials: 'include',
    ...options,
  };

  if (form) {
    const formData = new FormData(form.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    init.body = JSON.stringify(data);
  }

  let url = getBackendURL(endpoint as ApiEndpoint);

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

  if (
    !response.ok &&
    response.status !== 401 &&
    response.status !== 429 &&
    response.status === 400
  ) {
    // throw new Error(`Failed to fetch data from ${url} with access token ${accessToken}`);

    const { message } = await response.json();

    console.warn('message', message);

    return {
      error: true,
      response,
      data: null,
      errorMessage: message,
    };
  }

  return {
    error: false,
    data: await response.json(),
  };
}
