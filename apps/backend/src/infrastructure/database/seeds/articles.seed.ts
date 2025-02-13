import { Injectable } from '@nestjs/common';
import { Article, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ArticlesSeed {
  async seed(
    tx: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<Article[]> {
    console.info('- Seeding articles...');

    const emails = await tx.email.findMany();

    if (emails.length === 0) {
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
        relevance_score: Math.random() * (1 - 0.1) + 0.1,
        email: { connect: { id: email.id } },
      };
    });

    const articles = await Promise.all(
      articlesData.map((article) => tx.article.create({ data: article })),
    );

    return articles;
  }
} 