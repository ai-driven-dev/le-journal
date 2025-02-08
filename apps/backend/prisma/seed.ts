import { PrismaClient } from '@prisma/client';

import { seedArticles } from './seeds/articles.seed';
import { seedEmails } from './seeds/emails.seed';
import { seedNewsletters } from './seeds/newsletters.seed';
import { seedProjects } from './seeds/projects.seed';
import { seedTransactions } from './seeds/transactions.seed';
import { seedUsers } from './seeds/users.seed';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seeding...');

  try {
    // Create entities in the correct order to respect relationships
    await seedUsers();
    await seedProjects();
    await seedNewsletters();
    await seedEmails();
    await seedArticles();
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
