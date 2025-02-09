import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

import { GetEmailsUseCase } from './application/use-cases/get-emails.use-case';
import { GetNewslettersUseCase } from './application/use-cases/get-newsletters.use-case';
import { SearchEmailsUseCase } from './application/use-cases/search-emails.use-case';
import { EMAIL_REPOSITORY } from './domain/repositories/email.repository.interface';
import { PrismaEmailRepository } from './infrastructure/repositories/prisma-email.repository';
import { NewsletterController } from './presentation/controllers/newsletter.controller';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [NewsletterController],
  providers: [
    GetEmailsUseCase,
    GetNewslettersUseCase,
    SearchEmailsUseCase,
    {
      provide: EMAIL_REPOSITORY,
      useClass: PrismaEmailRepository,
    },
  ],
  exports: [GetEmailsUseCase, GetNewslettersUseCase, SearchEmailsUseCase],
})
export class NewsletterModule {}
