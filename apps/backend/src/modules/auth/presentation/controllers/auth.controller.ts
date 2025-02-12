import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

import { AuthService } from '../../application/auth.service';
import { GoogleAuthGuard } from '../../guards/google-auth.guard';
import { GoogleProfileDto } from '../dtos/google-profile.dto';
import { Profile } from 'passport-google-oauth20';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {
    // Guard redirects to Google
  }

  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiResponse({ status: 200, description: 'Successfully authenticated' })
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Req() req: Request & { user: Profile & { refreshToken: string } },
    @Res() res: Response,
  ): Promise<void> {
    console.log('req', req.user);

    const { accessToken } = await this.authService.handleGoogleAuth(
      req.user as unknown as GoogleProfileDto,
    );

    // Set JWT token in cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    if (process.env.FRONTEND_URL === undefined) {
      throw new Error('FRONTEND_URL is not defined');
    }

    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }
}
