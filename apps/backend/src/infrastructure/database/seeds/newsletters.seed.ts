import { Injectable } from '@nestjs/common';
import { Newsletter, Prisma, PrismaClient, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class NewslettersSeed {
  private readonly adminEmail = process.env.ADMIN_EMAIL;

  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<Newsletter[]> {
    console.info('- Seeding newsletters...');

    if (!this.adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set');
    }

    const users = await tx.user.findMany({
      include: { projects: true },
    });

    const adminUser = users.find((u) => u.email === this.adminEmail);
    const standardUser = users.find((u) => u.email === 'user.standard@example.com');

    if (!adminUser || !standardUser) {
      throw new Error('Required users not found');
    }

    const newslettersData: Prisma.NewsletterCreateInput[] = [
      {
        email: 'tech@newsletter.com',
        subscription_status: SubscriptionStatus.ACTIVE,
        project: { connect: { id: standardUser.projects[0].id } },
      },
      {
        email: 'business@newsletter.com',
        subscription_status: SubscriptionStatus.IN_PROGRESS,
        project: { connect: { id: standardUser.projects[0].id } },
      },
      {
        email: 'admin@newsletter.com',
        subscription_status: SubscriptionStatus.ACTIVE,
        project: { connect: { id: adminUser.projects[0].id } },
      },
    ];

    const newsletters = await Promise.all(
      newslettersData.map((newsletter) => tx.newsletter.create({ data: newsletter })),
    );

    return newsletters;
  }
}
