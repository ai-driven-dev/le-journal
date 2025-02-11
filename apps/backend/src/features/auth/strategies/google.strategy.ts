import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

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
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails?.[0]?.value,
      name: `${name?.givenName ?? ''} ${name?.familyName ?? ''}`.trim(),
      avatar: photos?.[0]?.value,
      googleId: profile.id,
      accessToken,
    };
    done(null, user);
  }
}
