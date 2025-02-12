import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser extends User = User>(err: Error, user: TUser): TUser {
    if (err !== undefined || user === undefined) {
      throw new UnauthorizedException('Authentication required', { cause: err });
    }
    return user;
  }
}
