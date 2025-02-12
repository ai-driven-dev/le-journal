import type { User } from '@prisma/client';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
