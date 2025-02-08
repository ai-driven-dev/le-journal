import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, name?: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser && existingUser.email === email) {
      throw new ConflictException('User already exists');
    }

    return this.userRepository.create({
      email,
      name,
    });
  }
}
