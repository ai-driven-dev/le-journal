import { Injectable } from '@nestjs/common';

import { NewsletterDomain } from '../domain/newsletter.domain';
import { NewsletterRepository } from '../domain/newsletter.repository';
import { NewsletterMapper } from '../presentation/newsletter.mapper';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaNewsletterRepository implements NewsletterRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly newsletterMapper: NewsletterMapper,
  ) {}

  async findManyByUserId(userId: string): Promise<NewsletterDomain[]> {
    const newsletters = await this.prisma.newsletter.findMany({
      where: {
        project: {
          user_id: userId,
        },
      },
      orderBy: {
        subscribed_at: 'asc',
      },
    });

    return newsletters.map((newsletter) => this.newsletterMapper.toDomain(newsletter));
  }
}
