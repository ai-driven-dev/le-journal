import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Project } from '@prisma/client';

@Injectable()
export class ProjectsSeed {
  private readonly adminEmail = process.env.ADMIN_EMAIL;

  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<Project[]> {
    console.info('- Seeding projects...');

    if (!this.adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set');
    }

    const users = await tx.user.findMany();
    const standardUser = users.find((u) => u.email === 'user.standard@example.com');
    const adminUser = users.find((u) => u.email === this.adminEmail);
    const premiumUser = users.find((u) => u.email === 'user.premium@example.com');

    if (!standardUser || !adminUser || !premiumUser) {
      throw new Error('Required users not found');
    }

    const projectsData: Prisma.ProjectCreateInput[] = [
      {
        project_number: 1,
        name: 'Default',
        slug: 'default',
        newsletter_alias: 'newsletter.standard@example.com',
        prompt_instruction: 'Default prompt instruction for standard project',
        user: { connect: { id: standardUser.id } },
      },
      {
        project_number: 1,
        name: 'Default',
        slug: 'default',
        newsletter_alias: 'newsletter.admin@example.com',
        prompt_instruction: 'Default prompt instruction for admin project',
        user: { connect: { id: adminUser.id } },
      },
      {
        project_number: 1,
        name: 'Default',
        slug: 'default',
        newsletter_alias: 'newsletter.premium@example.com',
        prompt_instruction: 'Default prompt instruction for premium project',
        user: { connect: { id: premiumUser.id } },
      },
    ];

    const projects = await Promise.all(
      projectsData.map((project) => tx.project.create({ data: project })),
    );

    return projects;
  }
}
