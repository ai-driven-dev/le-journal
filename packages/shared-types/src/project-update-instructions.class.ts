import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  INSTRUCTIONS_VALIDATION_REGEX,
  MAX_INSTRUCTIONS_LENGTH,
  MIN_INSTRUCTIONS_LENGTH,
} from './project.class';

export class ProjectPromptInstructions {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_INSTRUCTIONS_LENGTH, {
    message: `L'instruction du prompt doit contenir au moins ${MIN_INSTRUCTIONS_LENGTH} caractères`,
  })
  @MaxLength(MAX_INSTRUCTIONS_LENGTH, {
    message: `L'instruction du prompt ne doit pas dépasser ${MAX_INSTRUCTIONS_LENGTH} caractères`,
  })
  @Matches(INSTRUCTIONS_VALIDATION_REGEX, {
    message:
      "L'instruction du prompt ne peut pas contenir de balises HTML ou de caractères spéciaux comme < > { }",
  })
  promptInstruction!: string;

  @IsDate()
  @IsOptional()
  lastPromptUpdate?: string;

  @IsBoolean()
  canUpdatePrompt!: boolean;
}
