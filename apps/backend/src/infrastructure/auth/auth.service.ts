import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { RefreshTokenCacheRepository } from '../redis/repositories/user-token.repository';

import { GoogleAuthProfile } from './auth.dto';
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_KEY,
  JwtPayload,
  REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_KEY,
} from './auth.types';

import { getEnv, isProduction } from 'src/main.env';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly refreshTokenCacheRepository: RefreshTokenCacheRepository,
  ) {}

  async handleGoogleAuth(
    googleProfile: GoogleAuthProfile,
    res: Response,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDomain }> {
    const user = await this.createUserUseCase.execute(googleProfile);

    const payload: JwtPayload = { userId: user.id };

    const { accessToken, refreshToken } = await this.setTokens(res, payload);

    return { accessToken, refreshToken, user };
  }

  async handleRefreshToken(req: Request, res: Response): Promise<void> {
    const { userId } = await this.isUserAuthenticated(req);

    if (userId === undefined) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    // Vérifier si le Refresh Token existe en Redis
    const storedToken = await this.refreshTokenCacheRepository.get(userId);
    if (!storedToken || storedToken !== refreshToken) {
      console.warn(
        `Refresh token missing or invalid for user ${userId}. Re-authentication required.`,
      );
      throw new UnauthorizedException('Invalid refresh token. Please log in again.');
    }

    const payload: JwtPayload = { userId };

    await this.setTokens(res, payload);
  }

  public async invalidateRefreshToken(res: Response): Promise<void> {
    res.clearCookie(ACCESS_TOKEN_KEY, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'none',
      domain: getEnv('BACKEND_DOMAIN'),
    });

    res.clearCookie('refreshToken', {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'none',
      domain: getEnv('BACKEND_DOMAIN'),
    });
  }

  public async isUserAuthenticated(req: Request): Promise<JwtPayload> {
    if (!Object.keys(req.cookies).includes(ACCESS_TOKEN_KEY)) {
      throw new UnauthorizedException(
        `No access token ${ACCESS_TOKEN_KEY} provided for: ${req.originalUrl}`,
      );
    }

    // eslint-disable-next-line security/detect-object-injection
    const accessToken = req.cookies[ACCESS_TOKEN_KEY];

    if (accessToken === undefined) {
      throw new UnauthorizedException(
        `No access token ${ACCESS_TOKEN_KEY} provided for: ${req.originalUrl}`,
      );
    }

    const payload: JwtPayload = this.jwtService.verify(accessToken);

    return payload;
  }

  private async setTokens(
    res: Response,
    payload: JwtPayload,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if (payload.userId === undefined) {
      throw new UnauthorizedException('User ID is undefined');
    }

    const accessToken = this.jwtService.sign({ userId: payload.userId }, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({ userId: payload.userId }, { expiresIn: '30d' });

    res.cookie(ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_EXPIRATION_TIME,
      // domain: getEnv('BACKEND_DOMAIN'),
    });

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      // domain: getEnv('BACKEND_DOMAIN'),
    });

    await this.refreshTokenCacheRepository.set({
      userId: payload.userId,
      refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
