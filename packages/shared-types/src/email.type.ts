import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import type { Article } from './article.type';

export enum EmailStatus {
  RECEIVED = 'RECEIVED',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

export class Email {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  project_id!: string;

  @IsString()
  @IsNotEmpty()
  newsletter_id!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  raw_content!: string;

  @IsDate()
  @IsNotEmpty()
  received_at!: Date;

  @IsEnum(EmailStatus)
  @IsNotEmpty()
  status!: EmailStatus;

  @IsNotEmpty()
  articles!: Article[];
}
