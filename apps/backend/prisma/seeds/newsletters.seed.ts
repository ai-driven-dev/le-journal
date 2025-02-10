import type { Newsletter, Prisma } from '@prisma/client';
import { PrismaClient, SubscriptionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNewsletters(): Promise<Newsletter[]> {
  console.log('🌱 Seeding newsletters...');

  const users = await prisma.user.findMany({
    include: { projects: true },
  });

  const adminUser = users.find((u) => u.email === 'admin.premium@example.com');
  const standardUser = users.find((u) => u.email === 'user.standard@example.com');

  if (!adminUser) {
    throw new Error('Required admin user not found');
  }

  if (!standardUser) {
    throw new Error('Required standard user not found');
  }

  const newslettersData: Prisma.NewsletterCreateInput[] = [
    {
      email: 'tech@newsletter.com',
      user: { connect: { id: standardUser.id } },
      subscription_status: SubscriptionStatus.ACTIVE,
      project: { connect: { id: standardUser.projects[0].id } },
    },
    {
      email: 'business@newsletter.com',
      user: { connect: { id: standardUser.id } },
      subscription_status: SubscriptionStatus.IN_PROGRESS,
      project: { connect: { id: standardUser.projects[0].id } },
    },
    {
      email: 'lifestyle@newsletter.com',
      user: { connect: { id: standardUser.id } },
      subscription_status: SubscriptionStatus.PENDING,
      project: { connect: { id: standardUser.projects[0].id } },
    },
    {
      email: 'tech.admin@newsletter.com',
      user: { connect: { id: adminUser.id } },
      subscription_status: SubscriptionStatus.ACTIVE,
      project: { connect: { id: adminUser.projects[0].id } },
    },
  ];

  const newsletters = await Promise.all(
    newslettersData.map((newsletter) => prisma.newsletter.create({ data: { ...newsletter } })),
  );

  console.log('✅ Newsletters seeded');
  return newsletters;
}
