import { ProjectPromptInstructions } from '@le-journal/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectUpdate extends ProjectPromptInstructions {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'Project ID',
  })
  id!: string;

  @ApiProperty({
    description: 'The instruction prompt for the project',
    example: 'Write a blog post about AI and its impact on society',
  })
  promptInstruction!: string;

  // TODO: Add external API security validation in the future
  // This could include:
  // - Content moderation
  // - Profanity checks
  // - Semantic analysis for malicious content
}
