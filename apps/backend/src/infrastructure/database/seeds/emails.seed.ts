import { Injectable } from '@nestjs/common';
import { Email, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EmailsSeed {
  private readonly adminEmail = process.env.ADMIN_EMAIL;

  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<Email[]> {
    console.info('- Seeding emails...');

    if (!this.adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set');
    }

    // D'abord on récupère les projets pour avoir les IDs
    const projects = await tx.project.findMany({
      include: {
        user: true,
        newsletters: true,
      },
    });

    const adminProject = projects.find((p) => p.user.email === this.adminEmail);
    const standardProject = projects.find((p) => p.user.email === 'user.standard@example.com');

    if (!adminProject?.newsletters[0] || !standardProject?.newsletters[0]) {
      throw new Error('Required newsletters not found');
    }

    const emailsData: Prisma.EmailCreateInput[] = [
      // Emails standards
      {
        subject: 'Latest Tech Trends 2024',
        raw_content: 'Exploring the most innovative technologies of 2024.',
        status: 'RECEIVED',
        newsletter: { connect: { id: standardProject.newsletters[0].id } },
      },
      {
        subject: 'AI Revolution in Business',
        raw_content: 'How AI is transforming modern businesses.',
        status: 'PROCESSED',
        newsletter: { connect: { id: standardProject.newsletters[0].id } },
      },
      {
        subject: 'Web Development Best Practices',
        raw_content: 'Essential tips for modern web development.',
        status: 'RECEIVED',
        newsletter: { connect: { id: standardProject.newsletters[0].id } },
      },
      // Emails admin
      {
        subject: 'Admin Platform Updates Q1 2024',
        raw_content:
          'Major platform updates and improvements for Q1 2024:\n' +
          '- Enhanced user management system\n' +
          '- New analytics dashboard\n' +
          '- Improved security features\n' +
          '- Performance optimizations',
        status: 'PROCESSED',
        newsletter: { connect: { id: adminProject.newsletters[0].id } },
      },
      {
        subject: 'System Security Report March 2024',
        raw_content:
          'Monthly security report detailing:\n' +
          '- Security incidents and resolutions\n' +
          '- Updated security protocols\n' +
          '- User access patterns\n' +
          '- Recommendations for improvement',
        status: 'RECEIVED',
        newsletter: { connect: { id: adminProject.newsletters[0].id } },
      },
      {
        subject: 'User Growth Analytics Q1',
        raw_content:
          'Quarterly user growth analysis:\n' +
          '- New user registrations\n' +
          '- User engagement metrics\n' +
          '- Retention statistics\n' +
          '- Recommendations for Q2',
        status: 'RECEIVED',
        newsletter: { connect: { id: adminProject.newsletters[0].id } },
      },
    ];

    const emails = await Promise.all(emailsData.map((email) => tx.email.create({ data: email })));

    return emails;
  }
}
