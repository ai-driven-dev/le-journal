/**
 * Représente un utilisateur tel qu'il est exposé via l'API.
 * Ce type est partagé entre le frontend et le backend.
 *
 * @property id - Identifiant unique de l'utilisateur
 * @property email - Adresse email de l'utilisateur
 * @property name - Nom de l'utilisateur (optionnel)
 * @property createdAt - Date de création au format ISO 8601
 * @property updatedAt - Date de dernière modification au format ISO 8601
 */
export interface ApiUser {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload pour la création d'un nouvel utilisateur via l'API.
 * Utilisé lors des requêtes POST /users.
 *
 * @property email - Adresse email du nouvel utilisateur
 * @property name - Nom du nouvel utilisateur (optionnel)
 */
export interface CreateApiUser {
  email: string;
  name?: string;
}
