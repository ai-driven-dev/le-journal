import type { NewsletterDomain } from './newsletter.domain';

export const NEWSLETTER_REPOSITORY = 'NEWSLETTER_REPOSITORY';

export interface NewsletterRepository {
  findManyByUserId(userId: string): Promise<NewsletterDomain[]>;
}
