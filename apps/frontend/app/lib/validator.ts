import { validateSync } from 'class-validator';

export function verify(instance: object): void {
  const errors = validateSync(instance);

  if (errors.length > 0) {
    throw errors;
  }
}

export function verifyFormData(form: React.FormEvent<HTMLFormElement>, state: object): void {
  if (form === null || form === undefined) {
    throw new Error('Form is null');
  }

  const objectFromForm = form.currentTarget;

  if (state === null || state === undefined) {
    throw new Error('State is null');
  }

  const formData = new FormData(objectFromForm.currentTarget);
  const formDataObject = Object.fromEntries(formData);

  // Vérification que toutes les clés du FormData existent dans l'objet de validation
  const formDataKeys = Object.keys(formDataObject);
  const invalidKeys = formDataKeys.filter((key) => !(key in state));

  if (invalidKeys.length > 0) {
    throw new Error(`Invalid form data keys: ${invalidKeys.join(', ')}`);
  }

  const objectToValidate = {
    ...state,
    ...formDataObject,
  };

  // Validation avec class-validator
  const errors = validateSync(objectToValidate);
  if (errors.length > 0) {
    const validationErrors = errors.map((error) => Object.values(error.constraints || {})).flat();
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
  }
}
