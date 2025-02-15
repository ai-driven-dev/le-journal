import { UserRole } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

import type { UserDomain } from '../domain/user.domain';

import type { Mapper } from 'src/presentation/mapper.interface';
import { UserModel } from 'src/prisma/prisma.types';

@Injectable()
export class UserMapper implements Mapper<UserDomain, UserModel> {
  toDomain(user: UserModel): UserDomain {
    const role = user.role as UserRole;

    if (!Object.values(UserRole).includes(role)) {
      throw new Error('Invalid user role');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      onboardingStartedAt: user.onboarding_started_at ?? null,
      onboardingCompletedAt: user.onboarding_completed_at ?? null,
      avatar: user.avatar ?? '',
      googleRefreshToken: user.google_refresh_token,
      googleScopes: user.google_scopes ?? [],
      role,
    };
  }

  toModel(user: UserDomain): UserModel {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      google_refresh_token: user.googleRefreshToken,
      google_scopes: user.googleScopes,
      avatar: user.avatar,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      role: user.role,
      onboarding_started_at: user.onboardingStartedAt ?? null,
      onboarding_completed_at: user.onboardingCompletedAt ?? null,
    };
  }
}
