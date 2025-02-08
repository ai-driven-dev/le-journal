import { seedArticles } from './articles.seed';
import { seedEmails } from './emails.seed';
import { seedNewsletters } from './newsletters.seed';
import { seedProjects } from './projects.seed';
import { seedTransactions } from './transactions.seed';
import { seedUsers } from './users.seed';

export async function seed(): Promise<void> {
  await seedUsers();
  await seedProjects();
  await seedNewsletters();
  await seedEmails();
  await seedArticles();
  await seedTransactions();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
seed();
