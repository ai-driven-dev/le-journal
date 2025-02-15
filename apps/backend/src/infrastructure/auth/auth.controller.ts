import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { Profile } from 'passport-google-oauth20';

import { GoogleAuthProfile } from './auth.dto';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_KEY } from './auth.types';
import { GoogleAuthGuardFull } from './guards/google-auth-full.guard';
import { GoogleAuthGuardReadonly } from './guards/google-auth-readonly.guard';

import { getEnv } from 'src/main.env';

// @Throttle({ default: { limit: 5, ttl: 60 } })
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Initial Google OAuth login -- full scope' })
  @Get('google/full')
  @UseGuards(GoogleAuthGuardFull)
  async googleAuthFull(): Promise<void> {}

  @ApiOperation({ summary: 'Afterwards Google OAuth login -- readonly scope' })
  @Get('google/readonly')
  @UseGuards(GoogleAuthGuardReadonly)
  async googleAuthReadonly(): Promise<void> {}

  @ApiOperation({ summary: 'Full scope Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to step 2 of onboarding' })
  @Get('google/callback/full')
  @UseGuards(GoogleAuthGuardFull)
  async googleAuthCallbackFull(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.authService.handleGoogleAuth(req.user as unknown as GoogleAuthProfile, res);

    res.redirect(getEnv('FRONTEND_URL') + '/onboarding/permissions');
  }

  @ApiOperation({ summary: 'Readonly scope Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to step 3 of onboarding' })
  @Get('google/callback/readonly')
  @UseGuards(GoogleAuthGuardReadonly)
  async googleAuthCallbackReadonly(
    @Req() req: Request & { user: Profile & { refreshToken: string } },
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.handleGoogleAuth(req.user as unknown as GoogleAuthProfile, res);

    res.redirect(getEnv('FRONTEND_URL') + '/dashboard/1');
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed access token',
  })
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log('refresh');
    try {
      const { accessToken } = await this.authService.handleRefreshToken(req, res);

      res.status(HttpStatus.OK).json({ accessToken });
    } catch (error: unknown | Error) {
      await this.authService.invalidateRefreshToken(res);

      throw new UnauthorizedException('Session expired, please log in again.', {
        cause: error,
      });
    }
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie(ACCESS_TOKEN_KEY);
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }
}
