import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const standardUser: Prisma.UserCreateInput = {
  email: 'user.standard@example.com',
  name: 'Standard User',
  profile: {
    create: {
      subscription_plan: 'FREE',
      newsletter_email_alias: 'standard.alias@example.com',
      prompt_instruction: 'Default prompt instruction for standard user',
      gmail_alias_folder_url: 'https://mail.google.com/mail/u/0/#label/standard',
    },
  },
};

const adminUser: Prisma.UserCreateInput = {
  email: 'admin.premium@example.com',
  name: 'Admin Premium',
  profile: {
    create: {
      subscription_plan: 'PREMIUM',
      newsletter_email_alias: 'admin.alias@example.com',
      prompt_instruction: 'Default prompt instruction for admin user',
      gmail_alias_folder_url: 'https://mail.google.com/mail/u/0/#label/admin',
    },
  },
};

const premiumUser: Prisma.UserCreateInput = {
  email: 'user.premium@example.com',
  name: 'Premium User',
  profile: {
    create: {
      subscription_plan: 'PREMIUM',
      newsletter_email_alias: 'premium.alias@example.com',
      prompt_instruction: 'Default prompt instruction for premium user',
      gmail_alias_folder_url: 'https://mail.google.com/mail/u/0/#label/premium',
    },
  },
};

export async function seedUsers() {
  console.log('🌱 Seeding users...');

  const users = await Promise.all([
    prisma.user.create({ data: standardUser }),
    prisma.user.create({ data: adminUser }),
    prisma.user.create({ data: premiumUser }),
  ]);

  console.log('✅ Users seeded');
  return users;
}
