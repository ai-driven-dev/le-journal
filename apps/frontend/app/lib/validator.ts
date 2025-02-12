import { validateSync } from 'class-validator';

export function verify(instance: object): void {
  const errors = validateSync(instance);

  if (errors.length > 0) {
    throw errors;
  }
}
