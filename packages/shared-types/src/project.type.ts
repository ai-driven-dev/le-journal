import { PickType } from '@nestjs/mapped-types';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProjectType {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  newsletterAlias!: string;

  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsString()
  promptInstruction!: string;
}

export class ProjectPromptType extends PickType(ProjectType, ['id', 'promptInstruction']) {}
