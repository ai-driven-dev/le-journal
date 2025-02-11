import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Authentication required');
    }
    return user;
  }
}
