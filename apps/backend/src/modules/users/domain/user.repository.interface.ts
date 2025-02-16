import type { Prisma, User } from '@prisma/client';

import type { UserDomain } from './user.domain';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  findAll(): Promise<UserDomain[]>;
  findByEmailOrGoogleId(email: User['email'], googleId: User['google_id']): Promise<User | null>;
  findById(id: User['id']): Promise<User | null>;
  createUser(data: Omit<Prisma.UserCreateInput, 'google_refresh_token_iv'>): Promise<User>;
  updateUser(userId: User['id'], data: Prisma.UserUpdateInput): Promise<User>;
}
