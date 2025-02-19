import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Auth, gmail_v1, google } from 'googleapis';

import { getEnv } from 'src/main.env';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';

@Injectable()
export class GoogleService {
  private oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly logger: Logger,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      getEnv('GOOGLE_CLIENT_ID'),
      getEnv('GOOGLE_CLIENT_SECRET'),
      getEnv('GOOGLE_CALLBACK_URL_FULL'),
    );
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const user = await this.getUserByIdUseCase.execute(userId);

    if (user === null) {
      throw new InternalServerErrorException(`User not found ${userId}`);
    }

    return user.googleRefreshToken;
  }

  async getAccessToken(userId: string): Promise<string | null> {
    const refreshToken = await this.getRefreshToken(userId);

    try {
      this.oauth2Client.setCredentials({ refresh_token: refreshToken });

      const { token } = await this.oauth2Client.getAccessToken();

      if (token === undefined || token === null) {
        throw new InternalServerErrorException("Impossible d'obtenir un access token");
      }

      // 🔍 Log des scopes du token
      const tokenInfo = await this.oauth2Client.getTokenInfo(token);

      this.logger.log('🔍 Google Access Token Info:', tokenInfo);

      return token;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token Google:', error);
      return null;
    }
  }

  /**
   * Crée un label Gmail pour un utilisateur
   */
  async createGmailLabel(userId: string, labelName: string): Promise<gmail_v1.Schema$Label> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new InternalServerErrorException("Impossible d'obtenir un access token");
    }

    this.oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

    const existingLabels = await gmail.users.labels.list({ userId: 'me' });

    const label = existingLabels.data.labels?.find((l) => l.name === labelName);
    if (label) {
      this.logger.log(`Label already exists: ${label.name} (ID: ${label.id})`);
      return label;
    }

    const response = await gmail.users.labels.create({
      userId: 'me',
      requestBody: {
        name: labelName,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      },
    });

    return response.data;
  }

  async createGmailFilter(params: {
    userId: string;
    criteria: { from: string };
    labelId: string;
  }): Promise<gmail_v1.Schema$Filter> {
    const accessToken = await this.getAccessToken(params.userId);

    if (!accessToken) {
      throw new InternalServerErrorException("Impossible d'obtenir un access token");
    }

    this.oauth2Client.setCredentials({ access_token: accessToken });

    this.logger.debug('Creating Gmail filter', {
      userId: params.userId,
      criteria: params.criteria,
      labelId: params.labelId,
    });

    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

    // Check if the filter already exists
    const existingFilters = await gmail.users.settings.filters.list({ userId: 'me' });
    const filter = existingFilters.data.filter?.find((f) => {
      const fromMatch = f.criteria?.from === params.criteria.from;
      const labelMatch = f.action?.addLabelIds?.includes(params.labelId);
      return Boolean(fromMatch && labelMatch);
    });

    if (filter) {
      this.logger.log(`Filter already exists: ${filter.id}`);
      return filter;
    }

    // Create a new filter if it doesn't exist
    const response = await gmail.users.settings.filters.create({
      userId: 'me',
      requestBody: {
        criteria: params.criteria,
        action: {
          addLabelIds: [params.labelId],
          removeLabelIds: ['INBOX'],
        },
      },
    });

    this.logger.debug('Gmail filter created', {
      filterId: response.data.id,
    });

    return response.data;
  }
}
