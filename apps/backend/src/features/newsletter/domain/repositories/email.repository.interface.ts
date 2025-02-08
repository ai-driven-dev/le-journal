import type { Email } from '@prisma/client';

export const EMAIL_REPOSITORY = 'EMAIL_REPOSITORY';

export interface EmailRepository {
  findByUserId(userId: string): Promise<Email[]>;
  searchByUserIdAndTerm(userId: string, searchTerm: string): Promise<Email[]>;
}
