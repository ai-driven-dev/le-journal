/**
 * Interface représentant les propriétés communes d'un utilisateur dans le domaine.
 * Cette interface est utilisée comme base pour tous les types d'utilisateurs.
 */
export interface BaseUserProperties {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}
