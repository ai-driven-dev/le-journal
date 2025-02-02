/**
 * Interface générique pour les mappers.
 * Définit un contrat standard pour la conversion entre différents types de modèles.
 *
 * @template TSource - Type source à convertir
 * @template TTarget - Type cible après conversion
 */
export interface Mapper<TSource, TTarget> {
  /**
   * Convertit une entité source en entité cible.
   *
   * @param source - Entité source à convertir
   * @throws {Error} Si la conversion échoue
   */
  toDomain(source: TSource): TTarget;

  /**
   * Convertit une liste d'entités sources en liste d'entités cibles.
   *
   * @param sources - Liste d'entités sources à convertir
   * @throws {Error} Si la conversion d'une des entités échoue
   */
  toDomainList(sources: TSource[]): TTarget[];
}
