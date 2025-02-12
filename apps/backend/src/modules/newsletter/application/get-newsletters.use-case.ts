import { Inject, Injectable } from '@nestjs/common';
import { Newsletter } from '@prisma/client';

import { NEWSLETTER_REPOSITORY, NewsletterRepository } from '../domain/newsletter.repository';

@Injectable()
export class GetNewslettersUseCase {
  constructor(
    @Inject(NEWSLETTER_REPOSITORY)
    private readonly newsletterRepository: NewsletterRepository,
  ) {}

  async execute(userId: string): Promise<Newsletter[]> {
    return this.newsletterRepository.findManyByUserId(userId);
  }
}
