// Types de base
interface BaseLogContext {
  service: string; // Nom du service/classe
  method: string; // Méthode/action
  correlationId?: string; // Pour le tracing
}

// Pour les logs standards (info, debug, warn)
export interface LogContext extends BaseLogContext {
  metadata?: Record<string, unknown>; // Données métier additionnelles
}

// Spécifique aux erreurs
export interface ErrorContext extends LogContext, BaseLogContext {
  error: unknown | Error; // On passe directement l'objet Error
}
