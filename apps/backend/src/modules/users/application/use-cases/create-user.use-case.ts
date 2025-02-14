import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserDomain } from '../../domain/user.domain';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';
import { UserMapper } from '../../presentation/user.mapper';

import { GoogleAuthProfile } from 'src/infrastructure/auth/auth.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(profile: GoogleAuthProfile): Promise<UserDomain> {
    const existingUser = await this.userRepository.findByEmailOrGoogleId(
      profile.email,
      profile.googleId,
    );
    let user: User;

    if (existingUser) {
      user = await this.userRepository.updateUser(existingUser.id, {
        name: profile.name ?? existingUser.name ?? '',
        avatar: profile.avatar ?? existingUser.avatar ?? '',
        google_refresh_token: profile.refreshToken,
        google_scopes: profile.scopes,
        updated_at: new Date(),
      });
    } else {
      user = await this.userRepository.createUser({
        email: profile.email,
        name: profile.name ?? '',
        avatar: profile.avatar ?? '',
        google_id: profile.googleId,
        google_refresh_token: profile.refreshToken,
        google_scopes: profile.scopes,
        created_at: new Date(),
        updated_at: new Date(),
        onboarding_started_at: new Date(),
      });
    }

    return this.userMapper.toDomain(user);
  }
}
