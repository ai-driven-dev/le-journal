type ApiEndpoint = 'users';

interface FetcherConfig {
  endpoint: ApiEndpoint;
  init?: RequestInit;
}

function getApiUrl(): string {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error('API_URL environment variable is not set');
  }
  return apiUrl;
}

export async function apiFetch<T>({ endpoint, init }: FetcherConfig): Promise<T> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
