import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import type { Profile } from 'passport-google-oauth20';

import { AuthService } from '../../application/auth.service';
import { GoogleAuthGuard } from '../../guards/google-auth.guard';
import { GoogleProfileDto } from '../dtos/google-profile.dto';

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
    const googleProfile = new GoogleProfileDto(req.user);
    const { accessToken } = await this.authService.handleGoogleAuth(googleProfile);

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
