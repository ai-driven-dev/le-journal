import type { Email, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEmails(): Promise<Email[]> {
  console.log('🌱 Seeding emails...');

  const projects = await prisma.project.findMany();
  const newsletters = await prisma.newsletter.findMany();

  if (!projects.length || !newsletters.length) {
    throw new Error('Required projects and newsletters not found');
  }

  const emailsData: Prisma.EmailCreateInput[] = [
    {
      subject: 'First Newsletter Email',
      raw_content: 'This is the content of the first newsletter email.',
      status: 'RECEIVED',
      project: { connect: { id: projects[0].id } },
      newsletter: { connect: { id: newsletters[0].id } },
    },
    {
      subject: 'Second Newsletter Email',
      raw_content: 'This is the content of the second newsletter email.',
      status: 'PROCESSED',
      project: { connect: { id: projects[0].id } },
      newsletter: { connect: { id: newsletters[0].id } },
    },
    {
      subject: 'Third Newsletter Email',
      raw_content: 'This is the content of the third newsletter email.',
      status: 'RECEIVED',
      project: { connect: { id: projects[1].id } },
      newsletter: { connect: { id: newsletters[1].id } },
    },
  ];

  const emails = await Promise.all(
    emailsData.map((emailData) => prisma.email.create({ data: emailData })),
  );

  console.log('✅ Emails seeded');
  return emails;
}
