import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiAuthProperty } from 'src/infrastructure/http/api-data-property.decorator';

export class ProjectCreateDomain {
  @ApiAuthProperty('name')
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiAuthProperty('slug')
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiAuthProperty('userId')
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiAuthProperty('emailAlias')
  @IsEmail()
  @IsNotEmpty()
  emailAlias!: string;

  @ApiAuthProperty('number')
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  constructor(project: ProjectCreateDomain) {
    Object.assign(this, project);
  }
}
