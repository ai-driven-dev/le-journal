import { apiFetch, type ApiFetcherConfig } from './api-fetcher';

export async function serverFetch<T>({
  endpoint,
  init,
  searchParams,
  headers,
}: ApiFetcherConfig): Promise<T> {
  return apiFetch<T>({
    endpoint,
    init,
    searchParams,
    headers,
  });
}
