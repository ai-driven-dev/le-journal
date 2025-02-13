import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleProfileDto } from './google-profile.dto';

import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async handleGoogleAuth(
    googleProfile: GoogleProfileDto,
  ): Promise<{ jwt: string; user: UserDomain }> {
    const { email, name, avatar, googleId, refreshToken } = googleProfile;

    let user;
    try {
      user = await this.createUserUseCase.execute({
        email,
        name,
        avatar,
        googleId,
        refreshToken,
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }

    const jwt = this.generateToken(user);
    return { jwt, user };
  }

  private generateToken(user: UserDomain): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
