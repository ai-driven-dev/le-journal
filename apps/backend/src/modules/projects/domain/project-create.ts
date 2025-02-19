import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class ProjectCreateDomain {
  @Property('name')
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Property('slug')
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @Property('userId')
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @Property('emailAlias')
  @IsEmail()
  @IsNotEmpty()
  emailAlias!: string;

  @Property('number')
  @IsNumber()
  @IsNotEmpty()
  projectNumber!: number;

  constructor(project: ProjectCreateDomain) {
    Object.assign(this, project);
  }
}
