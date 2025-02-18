import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// todo can activate on invalid_grant return to homepage to reauth again.
@Injectable()
export class GoogleAuthGuardFull extends AuthGuard('google-full') {}
