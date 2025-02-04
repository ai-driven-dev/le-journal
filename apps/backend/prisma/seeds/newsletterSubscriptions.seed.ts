import type { NewsletterSubscription, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
  console.log('🌱 Seeding newsletter subscriptions...');

  const users = await prisma.user.findMany({
    include: { projects: true },
  });

  const standardUser = users.find((u) => u.email === 'user.standard@example.com');
  const adminUser = users.find((u) => u.email === 'admin.premium@example.com');
  const premiumUser = users.find((u) => u.email === 'user.premium@example.com');

  if (!standardUser || !adminUser || !premiumUser) {
    throw new Error('Required users not found');
  }

  // Standard user subscription (1)
  const standardSubscription: Prisma.NewsletterSubscriptionCreateInput = {
    newsletter_name: 'Standard Newsletter',
    newsletter_email: 'standard@newsletter.com',
    newsletter_url: 'https://newsletter.com/standard',
    status: 'ACTIVE',
    user: { connect: { id: standardUser.id } },
  };

  // Admin user subscriptions (3)
  const adminSubscriptions: Prisma.NewsletterSubscriptionCreateInput[] = [
    {
      newsletter_name: 'Admin Newsletter 1',
      newsletter_email: 'admin1@newsletter.com',
      newsletter_url: 'https://newsletter.com/admin1',
      status: 'ACTIVE',
      user: { connect: { id: adminUser.id } },
    },
    {
      newsletter_name: 'Admin Newsletter 2',
      newsletter_email: 'admin2@newsletter.com',
      newsletter_url: 'https://newsletter.com/admin2',
      status: 'ACTIVE',
      user: { connect: { id: adminUser.id } },
    },
    {
      newsletter_name: 'Admin Newsletter 3',
      newsletter_email: 'admin3@newsletter.com',
      newsletter_url: 'https://newsletter.com/admin3',
      status: 'ACTIVE',
      user: { connect: { id: adminUser.id } },
    },
  ];

  // Premium user subscriptions (2)
  const premiumSubscriptions: Prisma.NewsletterSubscriptionCreateInput[] = [
    {
      newsletter_name: 'Premium Newsletter 1',
      newsletter_email: 'premium1@newsletter.com',
      newsletter_url: 'https://newsletter.com/premium1',
      status: 'ACTIVE',
      user: { connect: { id: premiumUser.id } },
    },
    {
      newsletter_name: 'Premium Newsletter 2',
      newsletter_email: 'premium2@newsletter.com',
      newsletter_url: 'https://newsletter.com/premium2',
      status: 'ACTIVE',
      user: { connect: { id: premiumUser.id } },
    },
  ];

  const subscriptions = await Promise.all([
    prisma.newsletterSubscription.create({ data: standardSubscription }),
    ...adminSubscriptions.map((sub) => prisma.newsletterSubscription.create({ data: sub })),
    ...premiumSubscriptions.map((sub) => prisma.newsletterSubscription.create({ data: sub })),
  ]);

  console.log('✅ Newsletter subscriptions seeded');
  return subscriptions;
}
