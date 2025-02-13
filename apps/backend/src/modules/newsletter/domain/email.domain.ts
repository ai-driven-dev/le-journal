import { Email, EmailStatus } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';

import { ArticleDomain } from './article.domain';

export class EmailDomain extends Email {
  @ApiProperty({
    description: 'Unique email ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Newsletter #42 - Latest tech news',
  })
  subject!: string;

  @ApiProperty({
    description: 'Raw email content',
    example: 'Email content in text format...',
  })
  content!: string;

  @ApiProperty({
    description: 'Email received date',
    example: '2024-03-20T10:00:00Z',
  })
  receivedAt!: Date;

  @ApiProperty({
    description: 'Email processing status',
    enum: EmailStatus,
    example: 'RECEIVED',
  })
  status!: EmailStatus;

  @ApiProperty({
    description: 'Articles associated with the email',
    type: [ArticleDomain],
  })
  articles!: ArticleDomain[];
}
