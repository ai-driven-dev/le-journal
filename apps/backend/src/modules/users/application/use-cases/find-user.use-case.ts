import { Inject, Injectable } from '@nestjs/common';

import { UserDomain } from '../../domain/user.domain';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';
import { UserMapper } from '../../presentation/user.mapper';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(googleId: string): Promise<UserDomain | null> {
    const user = await this.userRepository.findByGoogleId(googleId);

    if (user === null) {
      return null;
    }

    return this.userMapper.toDomain(user);
  }
}
