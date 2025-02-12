import { Article } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleDomain extends Article {
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
  link!: string;

  @ApiProperty({
    description: 'Relevance score of the article (0-1)',
    example: 0.95,
  })
  score!: number;

  @ApiProperty({
    description: 'Date and time when the article was extracted',
    example: '2024-01-01T12:00:00Z',
  })
  extractedAt!: Date;
}
