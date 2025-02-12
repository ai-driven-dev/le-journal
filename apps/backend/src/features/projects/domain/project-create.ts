import { ProjectType } from '@le-journal/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateProjectDto extends PickType(ProjectType, [
  'name',
  'slug',
  'newsletterAlias',
  'projectNumber',
  'userId',
]) {
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
}
