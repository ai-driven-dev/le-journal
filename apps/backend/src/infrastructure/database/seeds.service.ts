import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ArticlesSeed } from './seeds/articles.seed';
import { EmailsSeed } from './seeds/emails.seed';
import { NewslettersSeed } from './seeds/newsletters.seed';
import { ProjectsSeed } from './seeds/projects.seed';
import { TransactionsSeed } from './seeds/transactions.seed';
import { UsersSeed } from './seeds/users.seed';

@Injectable()
export class SeedsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersSeed: UsersSeed,
    private readonly projectsSeed: ProjectsSeed,
    private readonly newslettersSeed: NewslettersSeed,
    private readonly emailsSeed: EmailsSeed,
    private readonly articlesSeed: ArticlesSeed,
    private readonly transactionsSeed: TransactionsSeed,
  ) {}

  async seedAll(): Promise<void> {
    console.info('🌱 Starting database seeding...');

    try {
      await this.prisma.$transaction(async (tx) => {
        await this.usersSeed.seed(tx);
        await this.projectsSeed.seed(tx);
        await this.newslettersSeed.seed(tx);
        await this.emailsSeed.seed(tx);
        await this.articlesSeed.seed(tx);
        await this.transactionsSeed.seed(tx);
      });

      console.info('✅ Database seeding completed');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}
