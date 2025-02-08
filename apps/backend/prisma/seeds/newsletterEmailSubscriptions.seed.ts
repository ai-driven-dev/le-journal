import type { NewsletterEmailSubscription, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNewsletterEmailSubscriptions(): Promise<NewsletterEmailSubscription[]> {
  console.log('🌱 Seeding newsletter email subscriptions...');

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
  const standardSubscription: Prisma.NewsletterEmailSubscriptionCreateInput = {
    newsletter_name: 'Standard Newsletter',
    newsletter_email: 'standard@newsletter.com',
    newsletter_url: 'https://newsletter.com/standard',
    status: 'ACTIVE',
    user: { connect: { id: standardUser.id } },
  };

  // Admin user subscriptions (3)
  const adminSubscriptions: Prisma.NewsletterEmailSubscriptionCreateInput[] = [
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
  const premiumSubscriptions: Prisma.NewsletterEmailSubscriptionCreateInput[] = [
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
    prisma.newsletterEmailSubscription.create({ data: standardSubscription }),
    ...adminSubscriptions.map((sub) => prisma.newsletterEmailSubscription.create({ data: sub })),
    ...premiumSubscriptions.map((sub) => prisma.newsletterEmailSubscription.create({ data: sub })),
  ]);

  console.log('✅ Newsletter email subscriptions seeded');
  return subscriptions;
}
