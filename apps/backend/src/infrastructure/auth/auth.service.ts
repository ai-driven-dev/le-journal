import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleAuthProfile } from './auth.dto';

import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async handleGoogleAuth(
    googleProfile: GoogleAuthProfile,
  ): Promise<{ jwt: string; user: UserDomain }> {
    const user = await this.createUserUseCase.execute(googleProfile);
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
