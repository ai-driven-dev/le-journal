import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserDomain } from '../../users/domain/user.domain';

@Injectable()
export class CheckOnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDomain;

    if (user.onboardingCompletedAt) {
      throw new BadRequestException('Onboarding already completed');
    }

    return true;
  }
}
