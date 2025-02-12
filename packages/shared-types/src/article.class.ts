import { IsDate, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';

export class Article {
  @IsString()
  id!: string;

  @IsString()
  subject!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  score!: number;

  @IsString()
  @IsUrl()
  link!: string;

  @IsDate()
  extractedAt!: Date;
}
