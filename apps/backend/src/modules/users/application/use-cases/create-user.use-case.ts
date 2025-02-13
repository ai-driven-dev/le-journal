import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserDomain } from '../../domain/user.domain';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';
import { UserMapper } from '../../presentation/user.mapper';

import { GoogleProfileDto } from 'src/infrastructure/auth/google-profile.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(profile: GoogleProfileDto): Promise<UserDomain> {
    const existingUser = await this.userRepository.findByEmailOrGoogleId(profile.googleId);
    const isCurrentUserExisting = existingUser?.google_id === profile.googleId;
    let user: User;

    if (isCurrentUserExisting) {
      user = await this.userRepository.updateUser(existingUser.id, {
        name: profile.name ?? existingUser.name ?? '',
        avatar: profile.avatar ?? existingUser.avatar ?? '',
        refresh_token: profile.refreshToken,
      });
    } else {
      user = await this.userRepository.createUser({
        email: profile.email,
        name: profile.name ?? '',
        avatar: profile.avatar ?? '',
        google_id: profile.googleId,
        refresh_token: profile.refreshToken,
      });
    }

    return this.userMapper.toDomain(user);
  }
}
