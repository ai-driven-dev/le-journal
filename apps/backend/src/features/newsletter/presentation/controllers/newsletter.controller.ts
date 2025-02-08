import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetEmailsUseCase } from '../../application/use-cases/get-emails.use-case';
import { GetNewslettersUseCase } from '../../application/use-cases/get-newsletters.use-case';
import { SearchEmailsUseCase } from '../../application/use-cases/search-emails.use-case';
import { EmailDto } from '../dtos/email.dto';
import { NewsletterDto } from '../dtos/newsletter.dto';

// TODO: À remplacer par un middleware d'authentification
const TEMP_USER_ID = '1';

@ApiTags('Newsletters')
@Controller('newsletters')
@UsePipes(new ValidationPipe())
export class NewsletterController {
  constructor(
    private readonly getEmailsUseCase: GetEmailsUseCase,
    private readonly searchEmailsUseCase: SearchEmailsUseCase,
    private readonly getNewslettersUseCase: GetNewslettersUseCase,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Get all newsletter subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'List of newsletter subscriptions retrieved successfully',
    type: [NewsletterDto],
  })
  async getNewsletters(): Promise<NewsletterDto[]> {
    const newsletters = await this.getNewslettersUseCase.execute(TEMP_USER_ID);
    return newsletters.map((newsletter) => new NewsletterDto(newsletter));
  }

  @Get('emails')
  @ApiOperation({ summary: 'Récupérer tous les emails de la newsletter' })
  @ApiResponse({
    status: 200,
    description: 'Liste des emails récupérée avec succès',
    type: [EmailDto],
  })
  async getAllEmails(): Promise<EmailDto[]> {
    const emails = await this.getEmailsUseCase.execute(TEMP_USER_ID);
    return emails.map((email) => new EmailDto(email));
  }

  @Get('emails/search')
  @ApiOperation({ summary: 'Rechercher des emails dans la newsletter' })
  @ApiResponse({
    status: 200,
    description: 'Résultats de la recherche',
    type: [EmailDto],
  })
  async searchEmails(@Query('query') query: string): Promise<EmailDto[]> {
    const emails = await this.searchEmailsUseCase.execute(TEMP_USER_ID, query);
    return emails.map((email) => new EmailDto(email));
  }
}
