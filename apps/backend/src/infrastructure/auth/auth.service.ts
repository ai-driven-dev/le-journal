import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { AppLogger } from '../logger/logger.service';
import { RefreshTokenCacheRepository } from '../redis/repositories/user-token.repository';

import { GoogleAuthProfile } from './auth.dto';
import {
  ACCESS_TOKEN_KEY,
  JwtPayload,
  REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_KEY,
} from './auth.types';

import { isProduction } from 'src/main.env';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly refreshTokenCacheRepository: RefreshTokenCacheRepository,
    private readonly logger: AppLogger,
  ) {}

  async handleGoogleAuth(
    googleProfile: GoogleAuthProfile,
    res: Response,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDomain }> {
    this.logger.log("Create a new user from Google's profile callback.", {
      service: 'AuthService',
      method: 'handleGoogleAuth',
    });

    const user = await this.createUserUseCase.execute(googleProfile);

    const payload: JwtPayload = { userId: user.id };

    const { accessToken, refreshToken } = await this.setTokens(res, payload);

    return { accessToken, refreshToken, user };
  }

  async handleRefreshToken(
    req: Request,
    res: Response,
  ): Promise<{
    accessToken: string;
  }> {
    this.logger.log('Handle refresh token', {
      service: 'AuthService',
      method: 'handleRefreshToken',
    });

    if (!Object.keys(req.cookies).includes(REFRESH_TOKEN_KEY)) {
      throw new UnauthorizedException(
        `No refresh token ${REFRESH_TOKEN_KEY} provided for: ${req.originalUrl}`,
      );
    }

    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    const payload: JwtPayload = this.jwtService.verify(refreshToken);

    this.logger.log('Verify refresh token', {
      service: 'AuthService',
      method: 'handleRefreshToken',
      metadata: {
        payload,
      },
    });

    if (payload.userId === undefined) {
      throw new UnauthorizedException(`User ID is undefined for refresh token ${refreshToken}`);
    }

    const user = await this.getUserByIdUseCase.execute(payload.userId);

    if (user === null) {
      throw new UnauthorizedException(`User not found for userId: ${payload.userId}`);
    }

    const { accessToken } = await this.setTokens(res, payload);

    return { accessToken };
  }

  public async invalidateRefreshToken(res: Response): Promise<void> {
    res.clearCookie(REFRESH_TOKEN_KEY);
  }

  public async isUserAuthenticated(req: Request): Promise<JwtPayload> {
    if (!Object.keys(req.cookies).includes(ACCESS_TOKEN_KEY)) {
      throw new UnauthorizedException(
        `No access token ${ACCESS_TOKEN_KEY} provided for: ${req.originalUrl}`,
      );
    }

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
    this.logger.log('Set tokens', {
      service: 'AuthService',
      method: 'setTokens',
      metadata: {
        payload,
      },
    });

    if (payload.userId === undefined) {
      throw new UnauthorizedException('User ID is undefined');
    }

    const accessToken = this.jwtService.sign({ userId: payload.userId }, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({ userId: payload.userId }, { expiresIn: '30d' });

    this.logger.log('Extract tokens.', {
      service: 'AuthService',
      method: 'setTokens',
      metadata: {
        accessToken,
        refreshToken,
      },
    });

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      // domain: getEnv('BACKEND_DOMAIN'),
    });

    this.logger.log('Store on Redis', {
      service: 'AuthService',
      method: 'setTokens',
      metadata: {
        refreshToken,
      },
    });

    await this.refreshTokenCacheRepository.set({
      userId: payload.userId,
      refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
