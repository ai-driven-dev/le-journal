import type { Newsletter, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNewsletters(): Promise<Newsletter[]> {
  console.log('🌱 Seeding newsletters...');

  const users = await prisma.user.findMany({
    include: { projects: true },
  });

  const standardUser = users.find((u) => u.email === 'user.standard@example.com');
  const adminUser = users.find((u) => u.email === 'admin.premium@example.com');
  const premiumUser = users.find((u) => u.email === 'user.premium@example.com');

  if (!standardUser || !adminUser || !premiumUser) {
    throw new Error('Required users not found');
  }

  // Standard user newsletter
  const standardNewsletter: Prisma.NewsletterCreateInput = {
    email: 'standard@newsletter.com',
    user: { connect: { id: standardUser.id } },
  };

  // Admin user newsletters
  const adminNewsletters: Prisma.NewsletterCreateInput[] = [
    {
      email: 'admin1@newsletter.com',
      user: { connect: { id: adminUser.id } },
    },
    {
      email: 'admin2@newsletter.com',
      user: { connect: { id: adminUser.id } },
    },
    {
      email: 'admin3@newsletter.com',
      user: { connect: { id: adminUser.id } },
    },
  ];

  // Premium user newsletters
  const premiumNewsletters: Prisma.NewsletterCreateInput[] = [
    {
      email: 'premium1@newsletter.com',
      user: { connect: { id: premiumUser.id } },
    },
    {
      email: 'premium2@newsletter.com',
      user: { connect: { id: premiumUser.id } },
    },
  ];

  const newsletters = await Promise.all([
    prisma.newsletter.create({ data: standardNewsletter }),
    ...adminNewsletters.map((newsletter) => prisma.newsletter.create({ data: newsletter })),
    ...premiumNewsletters.map((newsletter) => prisma.newsletter.create({ data: newsletter })),
  ]);

  console.log('✅ Newsletters seeded');
  return newsletters;
}
