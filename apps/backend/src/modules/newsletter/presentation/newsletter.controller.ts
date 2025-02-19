import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt.guard';
import { GetEmailsUseCase } from '../application/get-emails.use-case';
import { GetNewslettersUseCase } from '../application/get-newsletters.use-case';
import { EmailDomain } from '../domain/email.domain';
import { NewsletterDomain } from '../domain/newsletter.domain';

import { EmailMapper } from './mappers/email.mapper';
import { NewsletterMapper } from './mappers/newsletter.mapper';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';
import { ApiAuthOperation } from 'src/infrastructure/http/api-response.decorator';

@ApiTags('Newsletters')
@Controller('api/newsletters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NewsletterController {
  constructor(
    private readonly getEmailsUseCase: GetEmailsUseCase,
    private readonly getNewslettersUseCase: GetNewslettersUseCase,
    private readonly newsletterMapper: NewsletterMapper,
    private readonly emailMapper: EmailMapper,
  ) {}

  @Get('')
  @ApiAuthOperation('Récupère toutes les souscriptions aux newsletters', {
    type: [NewsletterDomain],
  })
  async getNewsletters(@GetUser() user: User): Promise<NewsletterDomain[]> {
    const newsletters = await this.getNewslettersUseCase.execute(user.id);
    return newsletters.map((newsletter) => this.newsletterMapper.toDTO(newsletter));
  }

  @Get('emails')
  @ApiAuthOperation('Récupère tous les emails (+articles) des newsletters.', {
    type: [EmailDomain],
  })
  async getAllEmails(@Query('projectId') projectId: string): Promise<EmailDomain[]> {
    const emails = await this.getEmailsUseCase.execute(projectId);

    return emails.map((email) => this.emailMapper.toDTO(email));
  }
}
