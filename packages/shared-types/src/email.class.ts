import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import type { Article } from './article.class';

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
  subject!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsDate()
  @IsNotEmpty()
  receivedAt!: Date;

  @IsEnum(EmailStatus)
  @IsNotEmpty()
  status!: EmailStatus;

  @IsNotEmpty()
  articles!: Article[];
}
