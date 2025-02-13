import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { USER_REPOSITORY } from './domain/user.repository.interface';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserMapper } from './presentation/user.mapper';
import { UsersController } from './presentation/users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    GetAllUsersUseCase,
    CreateUserUseCase,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [USER_REPOSITORY, CreateUserUseCase],
})
export class UsersModule {}
