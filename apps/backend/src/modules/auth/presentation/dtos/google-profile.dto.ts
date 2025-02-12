import { IsEmail, IsOptional, IsString } from 'class-validator';
import type { Profile } from 'passport-google-oauth20';

export class GoogleProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  googleId: string;

  @IsString()
  refreshToken: string;

  constructor(profile: Profile & { refreshToken: string }) {
    this.email = profile.emails?.[0]?.value ?? '';
    this.name = profile.name?.givenName;
    this.avatar = profile.photos?.[0]?.value;
    this.googleId = profile.id;
    this.refreshToken = profile.refreshToken;
  }
}
