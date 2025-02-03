import { PrismaClient } from '@prisma/client';
import {
  seedEmails,
  seedNews,
  seedNewsletterSubscriptions,
  seedProjects,
  seedTransactions,
  seedUsers,
} from './seeds';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seeding...');

  try {
    // Create entities in the correct order to respect relationships
    await seedUsers();
    await seedProjects();
    await seedNewsletterSubscriptions();
    await seedEmails();
    await seedNews();
    await seedTransactions();

    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Error while seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
