import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Profile } from 'passport-google-oauth20';

import { GoogleAuthProfile } from './auth.dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuardFull } from './guards/google-auth-full.guard';
import { GoogleAuthGuardReadonly } from './guards/google-auth-readonly.guard';

import { isProduction } from 'src/main.env';

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
  @ApiResponse({ status: 302, description: 'Redirect to step 3 of onboarding' })
  @Get('google/callback/full')
  @UseGuards(GoogleAuthGuardFull)
  async googleAuthCallbackFull(
    @Req() req: Request & { user: Profile & { refreshToken: string } },
    @Res() res: Response,
  ): Promise<void> {
    const { jwt } = await this.authService.handleGoogleAuth(
      req.user as unknown as GoogleAuthProfile,
    );

    // Set JWT token in cookie
    res.cookie('access_token', jwt, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
    });

    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL + '/onboarding/setup');
  }

  @ApiOperation({ summary: 'Readonly scope Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to step 3 of onboarding' })
  @Get('google/callback/readonly')
  @UseGuards(GoogleAuthGuardReadonly)
  async googleAuthCallbackReadonly(
    @Req() req: Request & { user: Profile & { refreshToken: string } },
    @Res() res: Response,
  ): Promise<void> {
    const { jwt } = await this.authService.handleGoogleAuth(
      req.user as unknown as GoogleAuthProfile,
    );

    // Set JWT token in cookie
    res.cookie('access_token', jwt, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
    });

    res.redirect(process.env.FRONTEND_URL + '/onboarding/finish');
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }
}
