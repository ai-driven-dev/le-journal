import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
