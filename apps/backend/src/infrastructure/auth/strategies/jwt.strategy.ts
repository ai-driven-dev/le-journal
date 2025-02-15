import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../auth.types';

import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { UserModel } from 'src/prisma/prisma.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const token = request.headers.authorization?.split(' ')[1];

          if (token === undefined) {
            throw new UnauthorizedException('No access token provided in request cookies.');
          }

          return token;
        },
      ]),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    console.log('Payload dans validate:', payload);
    const user = await this.getUserByIdUseCase.execute(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
