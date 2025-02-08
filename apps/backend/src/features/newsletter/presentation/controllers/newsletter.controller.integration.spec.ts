import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Email, User } from '@prisma/client';

import { seedEmails } from '../../../../../prisma/seeds/emails.seed';
import { seedNewsletters } from '../../../../../prisma/seeds/newsletters.seed';
import { seedProjects } from '../../../../../prisma/seeds/projects.seed';
import { seedUsers } from '../../../../../prisma/seeds/users.seed';
import { PrismaService } from '../../../../prisma/prisma.service';
import { GetEmailsUseCase } from '../../application/use-cases/get-emails.use-case';
import { SearchEmailsUseCase } from '../../application/use-cases/search-emails.use-case';
import { EMAIL_REPOSITORY } from '../../domain/repositories/email.repository.interface';
import { PrismaEmailRepository } from '../../infrastructure/repositories/prisma-email.repository';
import { EmailDto } from '../dtos/email.dto';

import { NewsletterController } from './newsletter.controller';

interface NewsletterControllerWithUserId extends NewsletterController {
  TEMP_USER_ID: string;
}

describe('NewsletterController (Integration)', () => {
  let app: INestApplication;
  let controller: NewsletterControllerWithUserId;
  let prismaService: PrismaService;
  let standardUser: User;
  let adminUser: User;
  let premiumUser: User;
  let seededEmails: Email[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [NewsletterController],
      providers: [
        PrismaService,
        GetEmailsUseCase,
        SearchEmailsUseCase,
        {
          provide: EMAIL_REPOSITORY,
          useClass: PrismaEmailRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    controller = moduleFixture.get<NewsletterController>(
      NewsletterController,
    ) as NewsletterControllerWithUserId;
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Clean the database before each test
    await prismaService.email.deleteMany();
    await prismaService.newsletter.deleteMany();
    await prismaService.project.deleteMany();
    await prismaService.user.deleteMany();

    // Seed the database with test data
    const users = await seedUsers();
    standardUser = users.find((u) => u.email === 'user.standard@example.com')!;
    adminUser = users.find((u) => u.email === 'admin.premium@example.com')!;
    premiumUser = users.find((u) => u.email === 'user.premium@example.com')!;

    await seedProjects();
    await seedNewsletters();
    seededEmails = await seedEmails();
  });

  afterAll(async () => {
    await prismaService.email.deleteMany();
    await prismaService.newsletter.deleteMany();
    await prismaService.project.deleteMany();
    await prismaService.user.deleteMany();
    await app.close();
  });

  describe('getAllEmails', () => {
    it('should return all emails for the standard user', async () => {
      // Override the TEMP_USER_ID with the standard user's ID
      controller.TEMP_USER_ID = standardUser.id;

      const emails = await controller.getAllEmails();

      // The standard user should have emails from their newsletter
      expect(emails.length).toBeGreaterThan(0);
      expect(emails.every((email) => email instanceof EmailDto)).toBe(true);

      // Verify email DTO structure
      emails.forEach((email) => {
        expect(email).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            newsletter_id: expect.any(String),
            project_id: expect.any(String),
            subject: expect.any(String),
            raw_content: expect.any(String),
            received_at: expect.any(Date),
            status: expect.any(String),
          }),
        );
      });
    });

    it('should return all emails for the admin user', async () => {
      // Override the TEMP_USER_ID with the admin user's ID
      controller.TEMP_USER_ID = adminUser.id;

      const emails = await controller.getAllEmails();

      // The admin user should have multiple emails from their newsletters
      expect(emails.length).toBeGreaterThan(0);
      expect(emails.every((email) => email instanceof EmailDto)).toBe(true);
    });

    it('should return empty array when no emails exist for a new user', async () => {
      // Create a new user without any newsletters or emails
      const newUser = await prismaService.user.create({
        data: {
          email: 'new.user@example.com',
          name: 'New User',
        },
      });

      // Override the TEMP_USER_ID with the new user's ID
      controller.TEMP_USER_ID = newUser.id;

      const emails = await controller.getAllEmails();

      expect(emails).toHaveLength(0);
      expect(emails).toEqual([]);
    });
  });

  describe('searchEmails', () => {
    it('should return emails matching the search term', async () => {
      // Override the TEMP_USER_ID with the standard user's ID
      controller.TEMP_USER_ID = standardUser.id;

      // Search for the first newsletter email
      const searchResults = await controller.searchEmails('First Newsletter');

      expect(searchResults.length).toBeGreaterThan(0);
      expect(searchResults[0].subject).toBe('First Newsletter Email');
      expect(searchResults[0]).toBeInstanceOf(EmailDto);
    });

    it('should return empty array when no emails match the search term', async () => {
      // Override the TEMP_USER_ID with the standard user's ID
      controller.TEMP_USER_ID = standardUser.id;

      const searchResults = await controller.searchEmails('NonexistentTerm');

      expect(searchResults).toHaveLength(0);
      expect(searchResults).toEqual([]);
    });

    it('should only return emails matching the search term for the current user', async () => {
      // Override the TEMP_USER_ID with the admin user's ID
      controller.TEMP_USER_ID = adminUser.id;

      // Search for emails containing "Newsletter"
      const searchResults = await controller.searchEmails('Newsletter');

      // Verify that all returned emails belong to the admin user's newsletters
      const adminNewsletters = await prismaService.newsletter.findMany({
        where: { user_id: adminUser.id },
      });
      const adminNewsletterIds = adminNewsletters.map((n) => n.id);

      expect(searchResults.length).toBeGreaterThan(0);
      expect(searchResults.every((email) => adminNewsletterIds.includes(email.newsletter_id))).toBe(
        true,
      );
    });
  });
});
