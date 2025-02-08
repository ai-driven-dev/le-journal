import type { Article, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedArticles(): Promise<Article[]> {
  console.log('🌱 Seeding articles...');

  const emails = await prisma.email.findMany();

  if (!emails.length) {
    throw new Error('Required emails not found');
  }

  const articlesData: Prisma.ArticleCreateInput[] = emails.map((email) => ({
    title: `Article from ${email.subject}`,
    description: 'This is a sample article description',
    url: 'https://example.com/article',
    content: 'This is the full content of the article',
    relevance_score: 0.85,
    email: { connect: { id: email.id } },
  }));

  const articles = await Promise.all(
    articlesData.map((articleData) => prisma.article.create({ data: articleData })),
  );

  console.log('✅ Articles seeded');
  return articles;
}
