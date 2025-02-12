export interface Mapper<D, M> {
  /**
   * Convert a domain object to a database (model) object (for Prisma).
   */
  toModel(domain: D, ...args: unknown[]): M;

  /**
   * Convert a database object to a domain object (for the app, API and frontend).
   */
  toDomain(model: M): D;
}
