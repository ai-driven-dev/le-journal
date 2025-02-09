import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';

import { PrismaModule } from '../../../../prisma/prisma.module';
import { PrismaService } from '../../../../prisma/prisma.service';
import { USER_REPOSITORY } from '../../../users/domain/repositories/user.repository.interface';
import { PrismaUserRepository } from '../../../users/infrastructure/repositories/prisma-user.repository';
import { GetEmailsUseCase } from '../../application/use-cases/get-emails.use-case';
import { GetNewslettersUseCase } from '../../application/use-cases/get-newsletters.use-case';
import { SearchEmailsUseCase } from '../../application/use-cases/search-emails.use-case';
import { EMAIL_REPOSITORY } from '../../domain/repositories/email.repository.interface';
import { PrismaEmailRepository } from '../../infrastructure/repositories/prisma-email.repository';

import { NewsletterController } from './newsletter.controller';

interface NewsletterControllerWithUserId extends NewsletterController {
  TEMP_USER_ID: string;
}

describe('NewsletterController (Integration)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let controller: NewsletterControllerWithUserId;
  let prismaService: PrismaService;
  let standardUser: User;
  let adminUser: User;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [NewsletterController],
      providers: [
        GetEmailsUseCase,
        SearchEmailsUseCase,
        GetNewslettersUseCase,
        {
          provide: EMAIL_REPOSITORY,
          useClass: PrismaEmailRepository,
        },
        {
          provide: USER_REPOSITORY,
          useClass: PrismaUserRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    controller = moduleFixture.get<NewsletterController>(
      NewsletterController,
    ) as NewsletterControllerWithUserId;
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    // Get existing users
    const standardUserResult = await prismaService.user.findUnique({
      where: { email: 'user.standard@example.com' },
    });
    const adminUserResult = await prismaService.user.findUnique({
      where: { email: 'admin.premium@example.com' },
    });

    if (!standardUserResult || !adminUserResult) {
      throw new Error('Required test users not found in database');
    }

    standardUser = standardUserResult;
    adminUser = adminUserResult;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getAllEmails', () => {
    it('should return all emails for the standard user', async () => {
      // Set the user email
      controller.userEmail = standardUser.email;
      await controller.initializeUser();

      const project = await prismaService.project.findFirst({
        where: { user_id: controller.TEMP_USER_ID },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      const result = await controller.getAllEmails(project.id);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return all emails for the admin user', async () => {
      // Set the user email
      controller.userEmail = adminUser.email;
      await controller.initializeUser();

      const project = await prismaService.project.findFirst({
        where: { user_id: controller.TEMP_USER_ID },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      const result = await controller.getAllEmails(project.id);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array when no emails exist for a new user', async () => {
      // Create a new user
      const newUser = await prismaService.user.create({
        data: {
          email: 'newuser@example.com',
          name: 'New User',
        },
      });

      // Set the user email
      controller.userEmail = newUser.email;
      await controller.initializeUser();

      const project = await prismaService.project.create({
        data: {
          user_id: newUser.id,
          project_number: 1,
          name: 'Test Project',
          slug: 'test-project',
          newsletter_alias: 'test',
        },
      });

      const result = await controller.getAllEmails(project.id);
      expect(result).toEqual([]);

      // Clean up
      await prismaService.project.delete({ where: { id: project.id } });
      await prismaService.user.delete({ where: { id: newUser.id } });
    });
  });

  describe('searchEmails', () => {
    it('should return emails matching the search term', async () => {
      // Set the user email
      controller.userEmail = standardUser.email;
      await controller.initializeUser();

      const project = await prismaService.project.findFirst({
        where: { user_id: controller.TEMP_USER_ID },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      const result = await controller.searchEmails('test');
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array when no emails match the search term', async () => {
      // Set the user email
      controller.userEmail = standardUser.email;
      await controller.initializeUser();

      const result = await controller.searchEmails('nonexistentterm');
      expect(result).toEqual([]);
    });

    it('should only return emails matching the search term for the current user', async () => {
      // Set the user email
      controller.userEmail = standardUser.email;
      await controller.initializeUser();

      const result = await controller.searchEmails('test');
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // Add more specific assertions based on your test data
    });
  });
});
