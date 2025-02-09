interface ApiErrorDetails {
  url?: string;
  method?: string;
  statusCode?: number;
  statusText?: string;
  responseBody?: unknown;
  requestBody?: unknown;
}

export class ApiError extends Error {
  public url?: string;
  public method?: string;
  public statusCode?: number;
  public statusText?: string;
  public responseBody?: unknown;
  public requestBody?: unknown;

  constructor(
    message: string,
    details?: ApiErrorDetails,
    public cause?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';

    if (details) {
      this.url = details.url;
      this.method = details.method;
      this.statusCode = details.statusCode;
      this.statusText = details.statusText;
      this.responseBody = details.responseBody;
      this.requestBody = details.requestBody;
    }
  }

  public toString(): string {
    const parts: string[] = [this.message];

    if (this.url) {
      parts.push(`URL: ${this.url}`);
    }
    if (this.method) {
      parts.push(`Method: ${this.method}`);
    }
    if (this.statusCode) {
      parts.push(`Status: ${this.statusCode} (${this.statusText || 'Unknown'})`);
    }
    if (this.responseBody !== undefined) {
      parts.push(`Response: ${JSON.stringify(this.responseBody, null, 2)}`);
    }
    if (this.requestBody !== undefined) {
      parts.push(`Request: ${JSON.stringify(this.requestBody, null, 2)}`);
    }
    if (this.cause instanceof Error) {
      parts.push(`Cause: ${this.cause.message}`);
    }

    return parts.join('\n');
  }
}

export function handleApiError(error: unknown, customMessage?: string): never {
  if (error instanceof ApiError) {
    throw error;
  }

  throw new ApiError(customMessage ?? 'An unexpected error occurred', undefined, error);
}
