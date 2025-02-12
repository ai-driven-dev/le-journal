import { ProjectType } from '@le-journal/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { Project } from './project';

export class ProjectUpdate extends PickType(ProjectType, ['id', 'promptInstruction']) {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: 'ID du projet',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
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
  @Expose()
  promptInstruction!: string;

  // TODO: Add external API security validation in the future
  // This could include:
  // - Content moderation
  // - Profanity checks
  // - Semantic analysis for malicious content

  constructor(dto: Project) {
    super();
    this.id = dto.id;
    this.promptInstruction = dto.promptInstruction;
  }
}
