import { Inject, Injectable, Logger } from '@nestjs/common';

import { UserDomain } from '../../domain/user.domain';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';
import { UserMapper } from '../../presentation/user.mapper';

import { UserCacheRepository } from 'src/infrastructure/redis/repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
    private readonly userCacheRepository: UserCacheRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<UserDomain | null> {
    this.logger.log(`Getting user ${id} from cache`);
    const cachedUser = await this.userCacheRepository.get(id);

    if (cachedUser) {
      this.logger.log(`User ${id} found in cache`);
      return this.userMapper.toDomain(cachedUser);
    }

    const user = await this.userRepository.findById(id);

    if (user) {
      this.logger.log(`User ${id} not found in cache, setting in cache`);
      const userDomain = this.userMapper.toDomain(user);
      await this.userCacheRepository.set(this.userMapper.toModel(userDomain));
      return userDomain;
    }

    return null;
  }
}
