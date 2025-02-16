import { Module } from '@nestjs/common';

import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProjectsModule } from '../projects/projects.module';

import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { USER_REPOSITORY } from './domain/user.repository.interface';
import { CryptoService } from './infrastructure/crypto.service';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserMapper } from './presentation/user.mapper';
import { UsersController } from './presentation/users.controller';

import { RedisModule } from 'src/infrastructure/redis/redis.module';

@Module({
  imports: [PrismaModule, LoggerModule, RedisModule, ProjectsModule],
  controllers: [UsersController],
  providers: [
    GetAllUsersUseCase,
    CreateUserUseCase,
    GetUserByIdUseCase,
    CryptoService,
    UserMapper,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [USER_REPOSITORY, CreateUserUseCase, GetUserByIdUseCase, UserMapper],
})
export class UsersModule {}
