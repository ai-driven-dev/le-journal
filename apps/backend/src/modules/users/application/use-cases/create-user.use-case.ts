import { Inject, Injectable } from '@nestjs/common';

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
    const existingUser = await this.userRepository.findByGoogleId(profile.googleId);

    if (existingUser?.google_id === profile.googleId) {
      const updatedUser = await this.userRepository.updateUser(existingUser.id, {
        name: profile.name ?? existingUser.name ?? '',
        avatar: profile.avatar ?? existingUser.avatar ?? '',
        refresh_token: profile.refreshToken,
      });

      return this.userMapper.toDomain(updatedUser);
    }

    const newUser = await this.userRepository.createUser({
      email: profile.email,
      name: profile.name ?? '',
      avatar: profile.avatar ?? '',
      google_id: profile.googleId,
      refresh_token: profile.refreshToken,
    });

    return this.userMapper.toDomain(newUser);
  }
}
