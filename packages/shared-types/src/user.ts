import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * Représente un utilisateur tel qu'il est exposé via l'API.
 * Ce type est partagé entre le frontend et le backend.
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
 */
export class CreateApiUser {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;
}
