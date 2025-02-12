import { PROJECT_MAX_LENGTH, PROJECT_MIN_LENGTH, ProjectType } from '@le-journal/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectUpdate extends PickType(ProjectType, ['id', 'promptInstruction']) {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'ID du projet',
  })
  id!: string;

  @ApiProperty({
    description: 'The instruction prompt for the project',
    example: 'Write a blog post about AI and its impact on society',
    minLength: PROJECT_MIN_LENGTH,
    maxLength: PROJECT_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  promptInstruction!: string;

  // TODO: Add external API security validation in the future
  // This could include:
  // - Content moderation
  // - Profanity checks
  // - Semantic analysis for malicious content
}
