import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { UsersSeed } from './seeds/users.seed';
import { ProjectsSeed } from './seeds/projects.seed';
import { NewslettersSeed } from './seeds/newsletters.seed';
import { EmailsSeed } from './seeds/emails.seed';
import { ArticlesSeed } from './seeds/articles.seed';
import { TransactionsSeed } from './seeds/transactions.seed';

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
    console.log('🌱 Starting database seeding...');

    try {
      await this.prisma.$transaction(async (tx) => {
        await this.usersSeed.seed(tx);
        await this.projectsSeed.seed(tx);
        await this.newslettersSeed.seed(tx);
        await this.emailsSeed.seed(tx);
        await this.articlesSeed.seed(tx);
        await this.transactionsSeed.seed(tx);
      });

      console.log('✅ Database seeding completed');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}
