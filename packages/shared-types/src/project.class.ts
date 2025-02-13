import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export const PROJECT_MIN_LENGTH = 10;
export const PROJECT_MAX_LENGTH = 200;
export const PROJECT_VALIDATION = /^[^<>{}]*$/;
export const PROMPT_UPDATE_DELAY_HOURS = 24;

export class Project {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  newsletterAlias!: string;

  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  lastPromptUpdate?: Date;

  @IsBoolean()
  @IsNotEmpty()
  canUpdatePrompt!: boolean;

  @IsString()
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
}

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
  lastPromptUpdate: Date | null;

  @IsBoolean()
  @IsOptional()
  canUpdatePrompt: boolean;
}
