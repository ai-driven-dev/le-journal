import { UserRole } from '@le-journal/shared-types';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserDomain } from '../../../users/domain/user.domain';
import { GetProjectUseCase } from '../use-cases/get-project.use-case';

@Injectable()
export class CheckOnboardingGuard implements CanActivate {
  constructor(private readonly getProjectUseCase: GetProjectUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDomain;

    if (user === null || user.id === null) {
      throw new BadRequestException('Utilisateur non authentifié');
    }

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    const project = await this.getProjectUseCase.execute(user.id);

    if (project.length > 0 && project[0].onboardingCompletedAt) {
      throw new BadRequestException('Onboarding déjà complété');
    }

    return true;
  }
}
