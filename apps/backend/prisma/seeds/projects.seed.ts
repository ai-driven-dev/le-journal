import type { Prisma, Project } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProjects(): Promise<Project[]> {
  console.log('🌱 Seeding projects...');

  const users = await prisma.user.findMany();
  const standardUser = users.find((u) => u.email === 'user.standard@example.com');
  const adminUser = users.find((u) => u.email === 'admin.premium@example.com');
  const premiumUser = users.find((u) => u.email === 'user.premium@example.com');

  if (!standardUser || !adminUser || !premiumUser) {
    throw new Error('Required users not found');
  }

  const projectStandard: Prisma.ProjectCreateInput = {
    project_number: 1,
    name: 'Default',
    slug: 'default',
    newsletter_alias: 'newsletter.standard@example.com',
    prompt_instruction: 'Default prompt instruction for standard project',
    user: { connect: { id: standardUser.id } },
  };

  const projectAdmin: Prisma.ProjectCreateInput = {
    project_number: 1,
    name: 'Default',
    slug: 'default',
    newsletter_alias: 'newsletter.admin@example.com',
    prompt_instruction: 'Default prompt instruction for admin project',
    user: { connect: { id: adminUser.id } },
  };

  const projectPremium: Prisma.ProjectCreateInput = {
    project_number: 1,
    name: 'Default',
    slug: 'default',
    newsletter_alias: 'newsletter.premium@example.com',
    prompt_instruction: 'Default prompt instruction for premium project',
    user: { connect: { id: premiumUser.id } },
  };

  const projects = await Promise.all([
    prisma.project.create({ data: projectStandard }),
    prisma.project.create({ data: projectAdmin }),
    prisma.project.create({ data: projectPremium }),
  ]);

  console.log('✅ Projects seeded');
  return projects;
}
