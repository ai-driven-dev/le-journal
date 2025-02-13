import type { User } from '@prisma/client';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByEmailOrGoogleId(email: User['email'], googleId: User['google_id']): Promise<User | null>;
  findById(id: User['id']): Promise<User | null>;
  createUser(userData: Partial<Omit<User, 'id'>>): Promise<User>;
  updateUser(user_id: User['id'], userData: Partial<Omit<User, 'id'>>): Promise<User>;
}
