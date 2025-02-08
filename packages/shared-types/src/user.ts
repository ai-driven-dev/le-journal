/**
 * Représente un utilisateur tel qu'il est exposé via l'API.
 * Ce type est partagé entre le frontend et le backend.
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload pour la création d'un nouvel utilisateur via l'API.
 * Utilisé lors des requêtes POST /users.
 */
export interface UserCreate {
  email: string;
  name?: string;
}
