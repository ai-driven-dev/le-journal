import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user.repository.interface';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
