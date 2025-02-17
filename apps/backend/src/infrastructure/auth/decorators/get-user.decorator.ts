import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

import type { UserDomain } from 'src/modules/users/domain/user.domain';

export const GetUser = createParamDecorator(
  (data: keyof UserDomain | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserDomain;

    if (user === undefined) {
      throw new UnauthorizedException('User not found in request');
    }

    return user;
  },
);
