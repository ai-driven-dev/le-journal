import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../auth.types';

import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { UserDomain } from 'src/modules/users/domain/user.domain';
import { UserMapper } from 'src/modules/users/presentation/user.mapper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly userMapper: UserMapper,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request): string | null => {
          const token = request.headers.authorization?.split(' ')[1];

          if (token === null || token === undefined) {
            throw new UnauthorizedException('No access token provided in request cookies.');
          }

          return token;
        },
      ]),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDomain> {
    const user = await this.getUserByIdUseCase.execute(payload.userId);

    if (!user) {
      throw new UnauthorizedException(
        `User not found in DB with valid access token in JWT: ${payload?.userId}`,
      );
    }

    return user;
  }
}
