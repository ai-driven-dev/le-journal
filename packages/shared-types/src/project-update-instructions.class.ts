import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PROJECT_MAX_LENGTH, PROJECT_MIN_LENGTH, PROJECT_VALIDATION } from './project.class';

export class ProjectPromptInstructions {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(PROJECT_MIN_LENGTH, {
    message: `Prompt instruction must be at least ${PROJECT_MIN_LENGTH} characters long`,
  })
  @MaxLength(PROJECT_MAX_LENGTH, {
    message: `Prompt instruction must be at most ${PROJECT_MAX_LENGTH} characters long`,
  })
  @Matches(PROJECT_VALIDATION, {
    message: 'Prompt instruction cannot contain HTML tags or special characters like < > { }',
  })
  promptInstruction!: string;

  @IsDate()
  lastPromptUpdate?: Date | string;

  @IsBoolean()
  canUpdatePrompt?: boolean;
}
