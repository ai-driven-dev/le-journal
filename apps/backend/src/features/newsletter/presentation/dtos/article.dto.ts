import type { Article } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Article as PrismaArticle } from '@prisma/client';

export class ArticleDto implements Article {
  @ApiProperty({
    description: 'Unique ID of the article',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Subject or main topic of the article',
    example: 'Building Scalable Backend Services',
  })
  subject!: string;

  @ApiProperty({
    description: 'Description of the article content',
    example: 'Learn the best practices for building enterprise-grade NestJS applications...',
  })
  description!: string;

  @ApiProperty({
    description: 'URL to the full article',
    example: 'https://example.com/article/nestjs-best-practices',
    nullable: true,
  })
  link!: string | null;

  @ApiProperty({
    description: 'Relevance score of the article (0-1)',
    example: 0.95,
  })
  score!: number;

  constructor(article: PrismaArticle) {
    this.id = article.id;
    this.subject = article.title;
    this.description = article.description;
    this.link = article.url;
    this.score = article.relevance_score;
  }
}
