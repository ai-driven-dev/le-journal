import { validateSync } from 'class-validator';

import { API_ROUTES_PUT, getApiUrl } from './api-fetcher';

export async function clientFetch<T extends object>(
  objectFromForm: React.FormEvent<HTMLFormElement>,
  objectFromState: T | null,
): Promise<T> {
  objectFromForm.preventDefault();

  if (objectFromState === null) {
    throw new Error('State is null');
  }

  const formData = new FormData(objectFromForm.currentTarget);
  const formDataObject = Object.fromEntries(formData);

  // Vérification que toutes les clés du FormData existent dans l'objet de validation
  const formDataKeys = Object.keys(formDataObject);
  const invalidKeys = formDataKeys.filter((key) => !(key in objectFromState));

  if (invalidKeys.length > 0) {
    throw new Error(`Invalid form data keys: ${invalidKeys.join(', ')}`);
  }

  const objectToValidate = {
    ...objectFromState,
    ...formDataObject,
  };

  // Validation avec class-validator
  const errors = validateSync(objectToValidate);
  if (errors.length > 0) {
    const validationErrors = errors.map((error) => Object.values(error.constraints || {})).flat();
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
  }

  const response = await fetch(getApiUrl(API_ROUTES_PUT.projects), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objectToValidate),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour');
  }

  return await response.json();
}
