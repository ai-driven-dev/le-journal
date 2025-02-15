import { Inject, Injectable, Logger } from '@nestjs/common';

import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';

import { UserCacheRepository } from 'src/infrastructure/redis/repositories/user.repository';
import { UserModel } from 'src/prisma/prisma.types';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
    private readonly userCacheRepository: UserCacheRepository,
  ) {}

  async execute(id: string): Promise<UserModel | null> {
    this.logger.log(`Getting user ${id} from cache`);
    const cachedUser = await this.userCacheRepository.get(id);

    if (cachedUser) {
      this.logger.log(`User ${id} found in cache`);
      return cachedUser;
    }

    const user = await this.userRepository.findById(id);

    if (user) {
      this.logger.log(`User ${id} not found in cache, setting in cache`);
      await this.userCacheRepository.set(user);
    }

    return user;
  }
}
