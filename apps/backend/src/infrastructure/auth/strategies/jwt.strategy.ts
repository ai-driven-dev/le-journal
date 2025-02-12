import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/user.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          console.log('Cookies in request:', request?.cookies); // Debug
          const token = request?.cookies?.access_token;
          console.log('Extracted token:', token); // Debug
          return token;
        },
      ]),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('JWT Payload:', payload); // Debug

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
