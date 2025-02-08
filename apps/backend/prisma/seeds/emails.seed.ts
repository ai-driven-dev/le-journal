import type { Email, NewsletterEmailSubscription, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createEmailsForSubscription(
  subscriptionId: string,
  projectId: string,
): Prisma.EmailCreateInput[] {
  return Array.from({ length: 3 }, (_, i) => ({
    subject: `Email ${i + 1} for subscription ${subscriptionId}`,
    raw_content: `This is the raw content for email ${i + 1}`,
    status: 'RECEIVED',
    project: { connect: { id: projectId } },
    newsletter_subscription: { connect: { id: subscriptionId } },
  }));
}

export async function seedEmails(): Promise<Email[]> {
  console.log('🌱 Seeding emails...');

  type SubscriptionWithUser = NewsletterEmailSubscription & {
    user: {
      projects: { id: string }[];
    };
  };

  const subscriptions = await prisma.newsletterEmailSubscription.findMany({
    include: {
      user: {
        include: {
          projects: true,
        },
      },
    },
  });

  const emailsToCreate = subscriptions.flatMap((subscription: SubscriptionWithUser) => {
    const projectId = subscription.user.projects[0].id;
    return createEmailsForSubscription(subscription.id, projectId);
  });

  const emails: Email[] = await Promise.all(
    emailsToCreate.map((email: Prisma.EmailCreateInput) => prisma.email.create({ data: email })),
  );

  console.log('✅ Emails seeded');
  return emails;
}
