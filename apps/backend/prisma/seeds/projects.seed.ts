import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProjects() {
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
    name: 'Project Standard',
    slug: 'project-standard',
    user: { connect: { id: standardUser.id } },
  };

  const projectAdmin: Prisma.ProjectCreateInput = {
    project_number: 2,
    name: 'Project Admin',
    slug: 'project-admin',
    user: { connect: { id: adminUser.id } },
  };

  const projectPremium: Prisma.ProjectCreateInput = {
    project_number: 3,
    name: 'Project Premium',
    slug: 'project-premium',
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
