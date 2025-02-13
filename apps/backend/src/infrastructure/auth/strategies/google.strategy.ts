import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { GoogleProfileDto } from '../google-profile.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Missing Google OAuth configuration');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string, // TODO REDIS
    refreshToken: string,
    profile: Profile,
  ): Promise<GoogleProfileDto> {
    // need debug
    console.info({ accessToken }, { refreshToken }, { profile });

    // if (refreshToken === undefined) {
    //   throw new UnauthorizedException('No refresh token');
    // }

    return new GoogleProfileDto(profile, refreshToken);
  }
}
