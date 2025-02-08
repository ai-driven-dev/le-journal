import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, data: { name?: string; email?: string }): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email) {
      const existingUserWithEmail = await this.userRepository.findByEmail(data.email);
      if (existingUserWithEmail && existingUserWithEmail.id !== userId) {
        throw new Error('Email already in use');
      }
    }

    return this.userRepository.update(userId, data);
  }
}
