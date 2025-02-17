import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Auth, gmail_v1, google } from 'googleapis';

import { getEnv } from 'src/main.env';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';

@Injectable()
export class GoogleService {
  private oauth2Client: Auth.OAuth2Client;

  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {
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
      console.log('🔍 Google Access Token Info:', tokenInfo);

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

    try {
      const response = await gmail.users.labels.create({
        userId: 'me',
        requestBody: {
          name: labelName,
          labelListVisibility: 'labelShow',
          messageListVisibility: 'show',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du label Gmail:', error);
      throw new InternalServerErrorException('Impossible de créer le label Gmail');
    }
  }
}
