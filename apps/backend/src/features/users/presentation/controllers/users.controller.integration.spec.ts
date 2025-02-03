import { CreateApiUser } from '@le-journal/shared-types';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import { UsersController } from './users.controller';

describe('UsersController (Integration)', () => {
  let app: INestApplication;
  let controller: UsersController;
  let prismaService: PrismaService;

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
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Clean the database before each test
    await prismaService.user.deleteMany();
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateApiUser = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const user: User = await controller.createUser(createUserDto);

      expect(user).toBeDefined();
      expect(user.email).toBe(createUserDto.email);
      expect(user.name).toBe(createUserDto.name);
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw conflict exception when creating user with existing email', async () => {
      const createUserDto: CreateApiUser = {
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
      const testUsers: CreateApiUser[] = [
        { email: 'user1@example.com', name: 'User 1' },
        { email: 'user2@example.com', name: 'User 2' },
      ];

      const createdUsers: User[] = [];
      for (const userData of testUsers) {
        const user = await controller.createUser(userData);
        createdUsers.push(user);
      }

      const users: User[] = await controller.getAllUsers();

      expect(users).toHaveLength(testUsers.length);
      expect(users.map((u) => u.email)).toEqual(
        expect.arrayContaining(testUsers.map((u) => u.email)),
      );

      // Verify user structure
      users.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        );
      });
    });

    it('should return empty array when no users exist', async () => {
      const users: User[] = await controller.getAllUsers();

      expect(users).toHaveLength(0);
      expect(users).toEqual([]);
    });
  });
});
