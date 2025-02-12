import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleProfileDto } from '../presentation/dtos/google-profile.dto';

import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { UserDomain } from 'src/modules/users/domain/user.domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async handleGoogleAuth(
    googleProfile: GoogleProfileDto,
  ): Promise<{ accessToken: string; user: UserDomain }> {
    const { email, name, avatar, googleId, refreshToken } = googleProfile;

    console.log('googleProfile', googleProfile);

    const user = await this.createUserUseCase.execute({
      email,
      name,
      avatar,
      googleId,
      refreshToken,
    });

    const accessToken = this.generateToken(user);
    return { accessToken, user };
  }

  private generateToken(user: UserDomain): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
