import { Controller, Get, Inject, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../users/domain/repositories/user.repository.interface';
import { GetEmailsUseCase } from '../../application/use-cases/get-emails.use-case';
import { GetNewslettersUseCase } from '../../application/use-cases/get-newsletters.use-case';
import { SearchEmailsUseCase } from '../../application/use-cases/search-emails.use-case';
import { EmailDto } from '../dtos/email.dto';
import { NewsletterDto } from '../dtos/newsletter.dto';

// TODO: À remplacer par un middleware d'authentification
const TEMP_USER_EMAIL = 'user.standard@example.com';

@ApiTags('Newsletters')
@Controller('newsletters')
@UsePipes(new ValidationPipe())
export class NewsletterController {
  private userId = '';
  public userEmail = TEMP_USER_EMAIL;

  constructor(
    private readonly getEmailsUseCase: GetEmailsUseCase,
    private readonly searchEmailsUseCase: SearchEmailsUseCase,
    private readonly getNewslettersUseCase: GetNewslettersUseCase,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async initializeUser(): Promise<void> {
    const user = await this.userRepository.findByEmail(this.userEmail);
    if (!user) {
      throw new Error('User not found');
    }
    this.userId = user.id;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all newsletter subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'List of newsletter subscriptions retrieved successfully',
    type: [NewsletterDto],
  })
  async getNewsletters(): Promise<NewsletterDto[]> {
    const newsletters = await this.getNewslettersUseCase.execute(this.userId);
    return newsletters.map((newsletter) => new NewsletterDto(newsletter));
  }

  @Get('emails')
  @ApiOperation({ summary: 'Récupérer tous les emails de la newsletter' })
  @ApiResponse({
    status: 200,
    description: 'Liste des emails récupérée avec succès',
    type: [EmailDto],
  })
  async getAllEmails(@Query('projectId') projectId: string): Promise<EmailDto[]> {
    const emails = await this.getEmailsUseCase.execute(projectId);
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
    const emails = await this.searchEmailsUseCase.execute(this.userId, query);
    return emails.map((email) => new EmailDto(email));
  }
}
