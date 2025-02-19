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
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { ApiRedirectResponse } from '../http/api-response-redirect.decorator';
import { ApiAuthOperation } from '../http/api-response.decorator';

import { GoogleAuthProfile } from './auth.dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuardFull } from './guards/google-auth-full.guard';

import { getEnv } from 'src/main.env';

@ApiTags('Authentication')
@Controller('auth')
// @Throttle({
//   default: {
//     limit: 3, // 3 requests per minute
//     ttl: 60000, // 1 minute
//   },
// })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiRedirectResponse('Full scope Google OAuth callback', '/onboarding')
  @Get('google/full')
  @UseGuards(GoogleAuthGuardFull)
  async googleAuthFull(): Promise<void> {
    // This endpoint is used to redirect the user to the Google OAuth page
  }

  @ApiRedirectResponse('Full scope Google OAuth callback', '/onboarding')
  @Get('google/callback/full')
  @UseGuards(GoogleAuthGuardFull)
  async googleAuthCallbackFull(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.authService.handleGoogleAuth(req.user as unknown as GoogleAuthProfile, res);
    const route = getEnv('FRONTEND_URL') + '/onboarding';

    res.redirect(route);
  }

  @ApiAuthOperation('Refresh access token')
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const { accessToken } = await this.authService.handleRefreshToken(req, res);

      res.status(HttpStatus.OK).json({ accessToken });
    } catch (error: unknown | Error) {
      await this.authService.invalidateRefreshToken(res);

      let message = 'Access token expired, please log in again.';

      if (error instanceof Error) {
        message = error.message;
      }

      throw new UnauthorizedException(message, {
        cause: error,
      });
    }
  }

  @ApiAuthOperation('Logout user')
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    await this.authService.invalidateRefreshToken(res);
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }
}
