import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { SeedCommand } from './seeds.command';
import { SeedsService } from './seeds.service';
import { UsersSeed } from './seeds/users.seed';
import { ProjectsSeed } from './seeds/projects.seed';
import { NewslettersSeed } from './seeds/newsletters.seed';
import { EmailsSeed } from './seeds/emails.seed';
import { ArticlesSeed } from './seeds/articles.seed';
import { TransactionsSeed } from './seeds/transactions.seed';

@Module({
  imports: [PrismaModule],
  providers: [
    SeedCommand,
    SeedsService,
    UsersSeed,
    ProjectsSeed,
    NewslettersSeed,
    EmailsSeed,
    ArticlesSeed,
    TransactionsSeed,
  ],
  exports: [SeedsService],
})
export class SeedsModule {}
