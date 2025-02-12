import { ProjectType } from '@le-journal/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

const MIN_LENGTH = 10;
const MAX_LENGTH = 200;
const VALIDATION = /^[^<>{}]*$/;

export class ProjectUpdate extends PickType(ProjectType, ['id', 'promptInstruction']) {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'ID du projet',
  })
  id!: string;

  @ApiProperty({
    description: 'The instruction prompt for the project',
    example: 'Write a blog post about AI and its impact on society',
    minLength: MIN_LENGTH,
    maxLength: MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_LENGTH, {
    message: `Prompt instruction must be at least ${MIN_LENGTH} characters long`,
  })
  @MaxLength(MAX_LENGTH, {
    message: `Prompt instruction must be at most ${MAX_LENGTH} characters long`,
  })
  @Matches(VALIDATION, {
    message: 'Prompt instruction cannot contain HTML tags or special characters like < > { }',
  })
  promptInstruction!: string;

  // TODO: Add external API security validation in the future
  // This could include:
  // - Content moderation
  // - Profanity checks
  // - Semantic analysis for malicious content
}
