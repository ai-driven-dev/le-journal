import { Inject, Injectable } from '@nestjs/common';

import { NewsletterDomain } from '../domain/newsletter.domain';
import { NEWSLETTER_REPOSITORY, NewsletterRepository } from '../domain/newsletter.repository';

@Injectable()
export class GetNewslettersUseCase {
  constructor(
    @Inject(NEWSLETTER_REPOSITORY)
    private readonly newsletterRepository: NewsletterRepository,
  ) {}

  async execute(userId: string): Promise<NewsletterDomain[]> {
    return this.newsletterRepository.findManyByUserId(userId);
  }
}
