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
      avatar: user.avatar ?? '', // todo
      refreshToken: user.refresh_token ?? '',
      role,
    };
  }

  toModel(user: UserDomain): UserModel {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      refresh_token: user.refreshToken,
      avatar: user.avatar,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      role: user.role,
    };
  }
}
