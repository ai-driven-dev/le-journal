import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import type { CreateUserDto } from '../dtos/user.dto';
import { UserDTO } from '../dtos/user.dto';

import { UsersController } from './users.controller';

describe('UsersController (Integration)', () => {
  let app: INestApplication;
  let controller: UsersController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        CreateUserUseCase,
        GetAllUsersUseCase,
        {
          provide: USER_REPOSITORY,
          useClass: PrismaUserRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    controller = moduleFixture.get<UsersController>(UsersController);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const userDto = await controller.createUser(createUserDto);

      expect(userDto).toBeInstanceOf(UserDTO);
      expect(userDto.email).toBe(createUserDto.email);
      expect(userDto.name).toBe(createUserDto.name);
      expect(userDto.id).toBeDefined();
      expect(new Date(userDto.createdAt)).toBeInstanceOf(Date);
      expect(new Date(userDto.updatedAt)).toBeInstanceOf(Date);
    });

    it('should throw conflict exception when creating user with existing email', async () => {
      const createUserDto: CreateUserDto = {
        email: 'duplicate@example.com',
        name: 'Duplicate User',
      };

      await controller.createUser(createUserDto);

      await expect(controller.createUser(createUserDto)).rejects.toThrow('User already exists');
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Create test users
      const testUsers: CreateUserDto[] = [
        { email: 'user1@example.com', name: 'User 1' },
        { email: 'user2@example.com', name: 'User 2' },
      ];

      const usersBeforeCreation = await controller.getAllUsers();

      const createdUsers: UserDTO[] = [];
      for (const userData of testUsers) {
        const user = await controller.createUser(userData);
        createdUsers.push(user);
      }

      const users = await controller.getAllUsers();

      expect(users).toHaveLength(usersBeforeCreation.length + testUsers.length);
      expect(users.map((u) => u.email)).toEqual(
        expect.arrayContaining(testUsers.map((u) => u.email)),
      );

      // Verify user structure
      users.forEach((user) => {
        expect(user).toBeInstanceOf(UserDTO);
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        );
      });
    });
  });
});
