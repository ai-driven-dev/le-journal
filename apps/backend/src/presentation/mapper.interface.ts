export interface Mapper<T, R> {
  toModel(domain: T): R;
  toDomain(model: R): T;
}
