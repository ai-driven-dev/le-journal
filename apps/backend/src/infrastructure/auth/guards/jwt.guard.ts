import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request = context.switchToHttp().getRequest();
    // console.log('=== JWT Guard Debug ===');
    // console.log('Cookies reçus:', request.cookies);
    // console.log(
    //   'Access Token from cookie:',
    //   request.cookies?.access_token?.substring(0, 20) + '...',
    // );

    return super.canActivate(context);
  }

  // Pain to debug, debugger not working, keep it for now...
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // handleRequest(err: any, user: any, info: any) {
  //   console.log('=== JWT Guard Validation ===');
  //   if (err) {
  //     console.log('Erreur de validation:', err);
  //   }
  //   if (user) {
  //     console.log('Utilisateur validé:', {
  //       id: user.id,
  //       email: user.email,
  //     });
  //   }

  //   if (err || !user) {
  //     throw new UnauthorizedException(err?.message);
  //   }
  //   return user;
  // }
}
