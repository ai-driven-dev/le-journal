import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectDomain {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  newsletterAlias!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  promptInstruction!: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  lastPromptUpdate?: Date;

  @ApiProperty()
  canUpdatePrompt!: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId!: string;

  constructor(project: ProjectDomain) {
    Object.assign(this, project);
  }
}
