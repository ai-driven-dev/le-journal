import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // get access token from bearer token
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (accessToken === undefined) {
      throw new UnauthorizedException('No access token provided in request bearer token.');
    }

    return super.canActivate(context);
  }
}
