import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

import { GetEmailsUseCase } from './application/get-emails.use-case';
import { GetNewslettersUseCase } from './application/get-newsletters.use-case';
import { EMAIL_REPOSITORY } from './domain/email.repository.interface';
import { NEWSLETTER_REPOSITORY } from './domain/newsletter.repository';
import { PrismaEmailRepository } from './infrastructure/prisma-email.repository';
import { PrismaNewsletterRepository } from './infrastructure/prisma-newsletter.repository';
import { ArticleMapper } from './presentation/article.mapper';
import { EmailMapper } from './presentation/email.mapper';
import { NewsletterController } from './presentation/newsletter.controller';
import { NewsletterMapper } from './presentation/newsletter.mapper';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [NewsletterController],
  providers: [
    GetEmailsUseCase,
    GetNewslettersUseCase,
    EmailMapper,
    NewsletterMapper,
    ArticleMapper,
    {
      provide: EMAIL_REPOSITORY,
      useClass: PrismaEmailRepository,
    },
    {
      provide: NEWSLETTER_REPOSITORY,
      useClass: PrismaNewsletterRepository,
    },
  ],
  exports: [GetEmailsUseCase, GetNewslettersUseCase, NEWSLETTER_REPOSITORY],
})
export class NewsletterModule {}
