import type { News, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createNewsForEmail(emailId: string): Prisma.NewsCreateInput[] {
  return Array.from({ length: 5 }, (_, i) => ({
    title: `News ${i + 1} from email ${emailId}`,
    description: `Description for news ${i + 1}`,
    url: `https://news.com/article-${i + 1}`,
    content: `Full content for news ${i + 1} from email ${emailId}`,
    relevance_score: Math.random() * 100,
    email: { connect: { id: emailId } },
  }));
}

export async function seedNews(): Promise<News[]> {
  console.log('🌱 Seeding news...');

  const emails = await prisma.email.findMany();

  const newsToCreate = emails.flatMap((email) => createNewsForEmail(email.id));

  const news = await Promise.all(newsToCreate.map((news) => prisma.news.create({ data: news })));

  console.log('✅ News seeded');
  return news;
}
