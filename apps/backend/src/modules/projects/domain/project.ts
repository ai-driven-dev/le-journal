import { Project } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDomain extends Project {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'ID du projet',
  })
  id!: string;

  @ApiProperty({ example: 'Mon super projet', description: 'Nom du projet' })
  name!: string;

  @ApiProperty({ example: 'mon-super-projet', description: 'Slug du projet' })
  slug!: string;

  @ApiProperty({ example: 'user-123', description: 'ID du propriétaire du projet' })
  userId!: string;

  @ApiProperty({ example: 'mon-alias', description: 'Alias unique pour les newsletters' })
  newsletterAlias!: string;

  @ApiProperty({ example: 1, description: 'Numéro du projet' })
  projectNumber!: number;

  @ApiProperty({ example: '2024-02-08T12:00:00.000Z', description: 'Date de création' })
  createdAt!: Date;

  @ApiProperty({
    example: 'Write a blog post about AI and its impact on society',
    description: 'Instruction pour le projet',
  })
  promptInstruction!: string;
}
