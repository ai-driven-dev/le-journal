import type { User } from '@prisma/client';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByGoogleId(googleId: string): Promise<User | null>;
  createUser(userData: {
    email: string;
    name: string;
    avatar: string;
    google_id: string;
    refresh_token: string;
  }): Promise<User>;
  updateUser(
    userId: string,
    userData: {
      name: string;
      avatar: string;
      refresh_token: string;
    },
  ): Promise<User>;
}
