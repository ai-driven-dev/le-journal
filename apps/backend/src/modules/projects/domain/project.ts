import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class ProjectDomain {
  @Property('id')
  @IsString()
  @IsNotEmpty()
  id!: string;

  @Property('name')
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Property('slug')
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @Property('emailAlias', 'Alias unique pour les newsletters')
  @IsEmail()
  @IsNotEmpty()
  emailAlias!: string;

  @Property('projectNumber', 'Numéro du projet')
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @Property('createdAt')
  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @Property('promptInstruction', 'Instruction du prompt')
  @IsString()
  @IsNotEmpty()
  promptInstruction!: string;

  @Property('lastPromptUpdate', "Date de la dernière mise à jour de l'instruction du prompt")
  @IsDate()
  @IsOptional()
  lastPromptUpdate?: Date;

  @Property(
    'canUpdatePrompt',
    "Indique si l'utilisateur peut mettre à jour l'instruction du prompt",
  )
  @IsBoolean()
  @IsNotEmpty()
  canUpdatePrompt!: boolean;

  @Property('googleLabelName', 'Nom du label Gmail créé pour le projet')
  @IsString()
  @IsOptional()
  googleLabelName?: string;

  @Property('onboardingStartedAt', "Date de début de l'onboarding")
  @IsDate()
  @IsOptional()
  onboardingStartedAt!: Date | null;

  @Property('onboardingCompletedAt', "Date de fin de l'onboarding")
  @IsDate()
  @IsOptional()
  onboardingCompletedAt!: Date | null;

  constructor(project: ProjectDomain) {
    Object.assign(this, project);
  }
}
