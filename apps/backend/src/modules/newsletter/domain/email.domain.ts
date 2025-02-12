import { Email, EmailStatus } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';

import { ArticleDomain } from './article.domain';

export class EmailDomain extends Email {
  @ApiProperty({
    description: "ID unique de l'email",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: "Sujet de l'email",
    example: 'Newsletter #42 - Les dernières actualités tech',
  })
  subject!: string;

  @ApiProperty({
    description: "Contenu brut de l'email",
    example: "Contenu de l'email au format texte...",
  })
  content!: string;

  @ApiProperty({
    description: "Date de réception de l'email",
    example: '2024-03-20T10:00:00Z',
  })
  receivedAt!: Date;

  @ApiProperty({
    description: "Statut de traitement de l'email",
    enum: EmailStatus,
    example: 'RECEIVED',
  })
  status!: EmailStatus;

  @ApiProperty({
    description: "Articles associés à l'email",
    type: [ArticleDomain],
  })
  articles!: ArticleDomain[];
}
