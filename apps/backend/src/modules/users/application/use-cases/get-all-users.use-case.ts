import { Inject, Injectable } from '@nestjs/common';

import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository.interface';

import { UserModel } from 'src/prisma/prisma.types';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }
}
