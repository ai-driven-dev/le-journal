import type { Article, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedArticles(): Promise<Article[]> {
  console.log('🌱 Seeding articles...');

  const emails = await prisma.email.findMany();

  if (!emails.length) {
    throw new Error('Required emails not found');
  }

  const articlesData: Prisma.ArticleCreateInput[] = emails.map((email) => {
    const baseUrl = 'https://lejournal.dev/articles/';
    const urlSlug = email.subject
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    return {
      title: email.subject,
      description: `Detailed article about ${email.subject.toLowerCase()}`,
      url: `${baseUrl}${urlSlug}`,
      content: `${email.raw_content}\n\nThis article provides in-depth analysis and insights about ${email.subject.toLowerCase()}.`,
      relevance_score: Math.random() * (1 - 0.1) + 0.1, // Score between 0.1 and 1
      email: { connect: { id: email.id } },
    };
  });

  const articles = await Promise.all(
    articlesData.map((articleData) => prisma.article.create({ data: articleData })),
  );

  console.log('✅ Articles seeded');
  return articles;
}
