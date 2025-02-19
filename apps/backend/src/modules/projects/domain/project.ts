import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiAuthProperty } from 'src/infrastructure/http/api-data-property.decorator';

export class ProjectDomain {
  @ApiAuthProperty('id')
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiAuthProperty('name')
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiAuthProperty('slug')
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiAuthProperty('emailAlias', 'Alias unique pour les newsletters')
  @IsEmail()
  @IsNotEmpty()
  emailAlias!: string;

  @ApiAuthProperty('projectNumber', 'Numéro du projet')
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  @ApiAuthProperty('createdAt')
  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @ApiAuthProperty('promptInstruction', 'Instruction du prompt')
  @IsString()
  @IsNotEmpty()
  promptInstruction!: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  lastPromptUpdate?: Date;

  @ApiAuthProperty(
    'canUpdatePrompt',
    "Indique si l'utilisateur peut mettre à jour l'instruction du prompt",
  )
  @IsBoolean()
  @IsNotEmpty()
  canUpdatePrompt!: boolean;

  @ApiAuthProperty('googleLabelName', 'Nom du label Gmail créé pour le projet')
  @IsString()
  @IsOptional()
  googleLabelName?: string;

  @ApiProperty({
    example: '2024-02-08T12:00:00.000Z',
    description: 'Onboarding started date',
  })
  @IsDate()
  @IsOptional()
  onboardingStartedAt!: Date | null;

  @ApiProperty({
    example: '2024-02-09T14:30:00.000Z',
    description: 'Onboarding completion date',
  })
  @IsDate()
  @IsOptional()
  onboardingCompletedAt!: Date | null;

  constructor(project: ProjectDomain) {
    Object.assign(this, project);
  }
}
