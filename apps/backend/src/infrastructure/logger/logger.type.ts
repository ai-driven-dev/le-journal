// Types de base
interface BaseLogContext {
  service: string;
  method: string;
  correlationId?: string;
}

export interface LogContext extends BaseLogContext {
  metadata?: Record<string, unknown>;
}

export interface ErrorContext extends LogContext {
  error: unknown; // Accepte n'importe quel type d'erreur
}
