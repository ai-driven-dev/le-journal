import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const defaultUsers: Prisma.UserCreateInput[] = [
    {
      id: 'admin',
      email: 'admin@example.com',
      name: 'Admin User',
    },
    {
      id: 'moderator',
      email: 'moderator@example.com',
      name: 'Moderator User',
    },
    {
      id: 'user',
      email: 'user@example.com',
      name: 'Regular User',
    },
  ];

  console.log('Starting to seed default users...');

  for (const user of defaultUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: user,
      });
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`User ${user.email} already exists, skipping...`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
