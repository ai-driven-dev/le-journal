import type { Prisma, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const standardUser: Prisma.UserCreateInput = {
  email: 'user.standard@example.com',
  name: 'Standard User',
};

export const adminUser: Prisma.UserCreateInput = {
  email: 'admin.premium@example.com',
  name: 'Admin Premium',
};

const premiumUser: Prisma.UserCreateInput = {
  email: 'user.premium@example.com',
  name: 'Premium User',
};

export async function seedUsers(): Promise<User[]> {
  console.log('🌱 Seeding users...');

  const users = await Promise.all([
    prisma.user.create({ data: standardUser }),
    prisma.user.create({ data: adminUser }),
    prisma.user.create({ data: premiumUser }),
  ]);

  console.log('✅ Users seeded');
  return users;
}
