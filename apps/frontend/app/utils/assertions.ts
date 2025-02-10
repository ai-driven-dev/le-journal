import { ApiError } from './api/error';

export class AssertionError extends ApiError {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export const assert = {
  /**
   * Vérifie si un tableau n'est pas vide
   * @param array Le tableau à vérifier
   * @param message Le message d'erreur à afficher si le tableau est vide
   * @throws {AssertionError} Si le tableau est vide
   */
  notEmpty<T>(array: T[], message: string): void {
    if (array === null || array === undefined || array.length === 0) {
      throw new AssertionError(message);
    }
  },

  /**
   * Vérifie si une valeur est définie (non null et non undefined)
   * @param value La valeur à vérifier
   * @param message Le message d'erreur à afficher si la valeur est non définie
   * @throws {AssertionError} Si la valeur est non définie
   */
  isDefined<T>(value: T | null | undefined, message: string): void {
    if (value === null || value === undefined) {
      throw new AssertionError(message);
    }
  },
};
