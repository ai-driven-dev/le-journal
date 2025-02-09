import type { Email, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEmails(): Promise<Email[]> {
  console.log('🌱 Seeding emails...');

  const project = await prisma.project.findFirst({
    where: {
      user: {
        email: 'user.standard@example.com',
      },
    },
  });
  const newsletters = await prisma.newsletter.findMany();

  if (project === null || !newsletters.length) {
    throw new Error('Required projects and newsletters not found');
  }

  const emailsData: Prisma.EmailCreateInput[] = [
    // Tech Newsletter Emails
    {
      subject: 'Latest Tech Trends 2024',
      raw_content: 'Exploring the most innovative technologies of 2024.',
      status: 'RECEIVED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[0].id } },
    },
    {
      subject: 'AI Revolution in Business',
      raw_content: 'How AI is transforming modern businesses.',
      status: 'PROCESSED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[0].id } },
    },
    {
      subject: 'Web Development Best Practices',
      raw_content: 'Essential tips for modern web development.',
      status: 'RECEIVED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[0].id } },
    },
    // Business Newsletter Emails
    {
      subject: 'Market Analysis Q1 2024',
      raw_content: 'Comprehensive analysis of Q1 2024 market trends.',
      status: 'RECEIVED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[1].id } },
    },
    {
      subject: 'Startup Success Stories',
      raw_content: 'Inspiring stories from successful startups.',
      status: 'PROCESSED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[1].id } },
    },
    {
      subject: 'Investment Strategies',
      raw_content: 'Expert insights on investment opportunities.',
      status: 'RECEIVED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[1].id } },
    },
    // Lifestyle Newsletter Emails
    {
      subject: 'Healthy Living Guide',
      raw_content: 'Tips for maintaining a healthy lifestyle.',
      status: 'RECEIVED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[2].id } },
    },
    {
      subject: 'Travel Destinations 2024',
      raw_content: 'Must-visit destinations for this year.',
      status: 'PROCESSED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[2].id } },
    },
    {
      subject: 'Mindfulness & Wellness',
      raw_content: 'Practices for mental and physical well-being.',
      status: 'RECEIVED',
      project: { connect: { id: project.id } },
      newsletter: { connect: { id: newsletters[2].id } },
    },
  ];

  const emails = await Promise.all(
    emailsData.map((emailData) => prisma.email.create({ data: emailData })),
  );

  console.log('✅ Emails seeded');
  return emails;
}
