import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
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
  @IsUUID()
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
  emailAlias!: string;

  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @IsDate()
  @IsNotEmpty()
  createdAt!: string;

  @IsDate()
  @IsOptional()
  lastPromptUpdate?: string;

  @IsBoolean()
  @IsNotEmpty()
  canUpdatePrompt!: boolean;

  @IsString()
  @MinLength(PROJECT_MIN_LENGTH, {
    message: `L'instruction du prompt doit contenir au moins ${PROJECT_MIN_LENGTH} caractères`,
  })
  @MaxLength(PROJECT_MAX_LENGTH, {
    message: `L'instruction du prompt ne doit pas dépasser ${PROJECT_MAX_LENGTH} caractères`,
  })
  @Matches(PROJECT_VALIDATION, {
    message:
      "L'instruction du prompt ne peut pas contenir de balises HTML ou de caractères spéciaux comme < > { }",
  })
  promptInstruction!: string;

  @IsString()
  @IsNotEmpty()
  googleLabelName!: string;

  @IsDate()
  @IsOptional()
  onboardingStartedAt?: Date | null;

  @IsDate()
  @IsOptional()
  onboardingCompletedAt?: Date | null;
}
