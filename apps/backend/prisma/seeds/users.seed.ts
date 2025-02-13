import type { Prisma, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL;

if (adminEmail === undefined) {
  throw new Error('ADMIN_EMAIL is not set');
}

const standardUser: Prisma.UserCreateInput = {
  email: 'user.standard@example.com',
  name: 'Standard User',
  role: 'REGULAR',
  google_id: '1234567890',
  avatar: 'https://example.com/avatar.png',
  refresh_token: '1234567890',
};

export const adminUser: Prisma.UserCreateInput = {
  email: adminEmail,
  name: 'Admin Premium',
  role: 'ADMIN',
  google_id: '1234567890',
  avatar: 'https://example.com/avatar.png',
  refresh_token: '1234567890',
};

const premiumUser: Prisma.UserCreateInput = {
  email: 'user.premium@example.com',
  name: 'Premium User',
  role: 'PREMIUM',
  google_id: '1234567890',
  avatar: 'https://example.com/avatar.png',
  refresh_token: '1234567890',
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
