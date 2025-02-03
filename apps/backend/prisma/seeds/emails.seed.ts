import { Prisma, PrismaClient } from '@prisma/client';

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
    newsletterSubscription: { connect: { id: subscriptionId } },
  }));
}

export async function seedEmails() {
  console.log('🌱 Seeding emails...');

  const subscriptions = await prisma.newsletterSubscription.findMany({
    include: {
      user: {
        include: {
          projects: true,
        },
      },
    },
  });

  const emailsToCreate = subscriptions.flatMap((subscription) => {
    const projectId = subscription.user.projects[0].id;
    return createEmailsForSubscription(subscription.id, projectId);
  });

  const emails = await Promise.all(
    emailsToCreate.map((email) => prisma.email.create({ data: email })),
  );

  console.log('✅ Emails seeded');
  return emails;
}
