import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetEmailsUseCase } from '../application/get-emails.use-case';
import { GetNewslettersUseCase } from '../application/get-newsletters.use-case';
import { EmailDomain } from '../domain/email.domain';
import { NewsletterDomain } from '../domain/newsletter.domain';

import { EmailMapper } from './email.mapper';
import { NewsletterMapper } from './newsletter.mapper';

@ApiTags('Newsletters')
@Controller('newsletters')
@UsePipes(new ValidationPipe())
export class NewsletterController {
  constructor(
    private readonly getEmailsUseCase: GetEmailsUseCase,
    private readonly getNewslettersUseCase: GetNewslettersUseCase,
    private readonly newsletterMapper: NewsletterMapper,
    private readonly emailMapper: EmailMapper,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get all newsletter subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'List of newsletter subscriptions retrieved successfully',
    type: [NewsletterDomain],
  })
  async getNewsletters(): Promise<NewsletterDomain[]> {
    const userId = '1'; // todo
    const newsletters = await this.getNewslettersUseCase.execute(userId);

    return newsletters.map((newsletter) => this.newsletterMapper.toDomain(newsletter));
  }

  @Get('emails')
  @ApiOperation({ summary: 'Get all newsletter emails' })
  @ApiResponse({
    status: 200,
    description: 'List of emails retrieved successfully',
    type: [EmailDomain],
  })
  async getAllEmails(@Query('projectId') projectId: string): Promise<EmailDomain[]> {
    const emails = await this.getEmailsUseCase.execute(projectId);

    return emails.map((email) => this.emailMapper.toDomain(email));
  }
}
