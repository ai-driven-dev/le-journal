import { Project } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Project as PrismaProject } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  constructor(project: PrismaProject) {
    this.id = project.id;
    this.name = project.name;
    this.slug = project.slug;
    this.userId = project.user_id;
    this.newsletterAlias = project.newsletter_alias;
    this.projectNumber = project.project_number;
    this.createdAt = project.created_at;
  }
}
