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


export const EMAIL_ALIAS_PREFIX = 'le-journal';

export const MIN_INSTRUCTIONS_LENGTH = 10;
export const MAX_INSTRUCTIONS_LENGTH = 200;
export const INSTRUCTIONS_VALIDATION_REGEX = /^[^<>{}]*$/;
export const PROMPT_UPDATE_FREQUENCY = 24; // 24 hours

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
