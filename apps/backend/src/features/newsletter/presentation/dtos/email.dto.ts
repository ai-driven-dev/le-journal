import type { Email } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { EmailStatus, Article as PrismaArticle, Email as PrismaEmail } from '@prisma/client';

import { ArticleDto } from './article.dto';

export class EmailDto implements Email {
  @ApiProperty({
    description: "ID unique de l'email",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'ID du projet associé',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  project_id!: string;

  @ApiProperty({
    description: 'ID de la newsletter associée',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  newsletter_id!: string;

  @ApiProperty({
    description: "Sujet de l'email",
    example: 'Newsletter #42 - Les dernières actualités tech',
  })
  subject!: string;

  @ApiProperty({
    description: "Contenu brut de l'email",
    example: "Contenu de l'email au format texte...",
  })
  raw_content!: string;

  @ApiProperty({
    description: "Date de réception de l'email",
    example: '2024-03-20T10:00:00Z',
  })
  received_at!: Date;

  @ApiProperty({
    description: "Statut de traitement de l'email",
    enum: EmailStatus,
    example: 'RECEIVED',
  })
  status!: EmailStatus;

  @ApiProperty({
    description: "Articles associés à l'email",
    type: [ArticleDto],
  })
  articles!: ArticleDto[];

  constructor(email: PrismaEmail & { articles: PrismaArticle[] }) {
    this.id = email.id;
    this.project_id = email.project_id;
    this.newsletter_id = email.newsletter_id;
    this.subject = email.subject;
    this.raw_content = email.raw_content;
    this.received_at = email.received_at;
    this.status = email.status;
    this.articles = email.articles.map((article: PrismaArticle) => new ArticleDto(article));
  }
}
