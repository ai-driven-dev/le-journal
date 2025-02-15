import type { AuthEndpoint } from './api-fetcher';
import { getBackendURL, type ApiEndpoint } from './api-fetcher';

export async function clientFetch(
  endpoint: ApiEndpoint | AuthEndpoint,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  accessToken?: string,
  form?: React.FormEvent<HTMLFormElement>,
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

  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url} with access token ${accessToken}`);
  }

  return response;
}
