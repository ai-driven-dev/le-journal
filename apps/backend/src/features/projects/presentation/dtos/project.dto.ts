import { Project } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Project as ProjectModel } from '@prisma/client';
import { Pick } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Mon super projet', description: 'Nom du projet' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'mon-super-projet', description: 'Slug du projet' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ example: 'user-123', description: 'ID du propriétaire du projet' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'mon-alias', description: 'Alias unique pour les newsletters' })
  @IsString()
  @IsNotEmpty()
  newsletterAlias!: string;

  @ApiProperty({ example: 1, description: 'Numéro du projet' })
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;
}

export class UpdateProjectPromptDto implements Pick<Project, 'id' | 'promptInstruction'> {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'ID du projet',
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: 'The instruction prompt for the project',
    example: 'Write a blog post about AI and its impact on society',
    minLength: 10,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Prompt instruction must be at least 10 characters long',
  })
  @MaxLength(200)
  @Matches(/^[^<>{}]*$/, {
    message: 'Prompt instruction cannot contain HTML tags or special characters like < > { }',
  })
  promptInstruction!: string;

  // TODO: Add external API security validation in the future
  // This could include:
  // - Content moderation
  // - Profanity checks
  // - Semantic analysis for malicious content
}

export class ProjectDto implements Project {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'ID du projet',
  })
  id: string;

  @ApiProperty({ example: 'Mon super projet', description: 'Nom du projet' })
  name: string;

  @ApiProperty({ example: 'mon-super-projet', description: 'Slug du projet' })
  slug: string;

  @ApiProperty({ example: 'user-123', description: 'ID du propriétaire du projet' })
  userId: string;

  @ApiProperty({ example: 'mon-alias', description: 'Alias unique pour les newsletters' })
  newsletterAlias: string;

  @ApiProperty({ example: 1, description: 'Numéro du projet' })
  projectNumber: number;

  @ApiProperty({ example: '2024-02-08T12:00:00.000Z', description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({
    example: 'Write a blog post about AI and its impact on society',
    description: 'Instruction pour le projet',
  })
  promptInstruction: string;

  constructor(project: ProjectModel) {
    this.id = project.id;
    this.name = project.name;
    this.slug = project.slug;
    this.userId = project.user_id;
    this.newsletterAlias = project.newsletter_alias;
    this.projectNumber = project.project_number;
    this.createdAt = project.created_at;
    this.promptInstruction = project.prompt_instruction;
  }
}
