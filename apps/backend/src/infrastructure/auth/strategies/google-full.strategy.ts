import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { GoogleAuthProfile } from '../auth.dto';
import { MissingGoogleConfigurationException } from '../auth.exceptions';

const GOOGLE_SCOPES_FULL = [
  'email',
  'profile',
  'openid',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.settings.basic',
];

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google-full') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL_FULL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new MissingGoogleConfigurationException('google-full', {
        clientID,
        clientSecret,
        callbackURL,
      });
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: GOOGLE_SCOPES_FULL,
    });
  }

  authorizationParams(): Record<string, string> {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<GoogleAuthProfile> {
    return new GoogleAuthProfile(profile, refreshToken, GOOGLE_SCOPES_FULL);
  }
}
