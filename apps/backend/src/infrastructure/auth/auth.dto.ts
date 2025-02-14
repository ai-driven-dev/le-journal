import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, validateSync } from 'class-validator';
import { Profile } from 'passport-google-oauth20';

export class GoogleAuthProfile {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  googleId!: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  scopes!: string[];

  /**
   * @url https://myaccount.google.com/connections/overview/
   * @description Refresh token is not provided on second connection, remove app first.
   */
  @IsString()
  refreshToken?: string;

  constructor(profile: Profile, refreshToken: string, scopes: string[]) {
    const email = profile.emails?.[0]?.value ?? '';
    const name = profile.name?.givenName ?? '';
    const avatar = profile.photos?.[0]?.value ?? '';
    const googleId = profile.id ?? '';

    this.email = email;
    this.name = name;
    this.avatar = avatar;
    this.googleId = googleId;
    this.refreshToken = refreshToken ?? '';
    this.scopes = scopes;

    const errors = validateSync(this);

    if (Array.isArray(errors) && errors.length > 0) {
      console.error('Invalid Google profile', errors);
      throw new Error('Invalid Google profile');
    }
  }
}
