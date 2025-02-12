import type { Newsletter } from '@prisma/client';

export const NEWSLETTER_REPOSITORY = 'NEWSLETTER_REPOSITORY';

export interface NewsletterRepository {
  findManyByUserId(userId: string): Promise<Newsletter[]>;
}
