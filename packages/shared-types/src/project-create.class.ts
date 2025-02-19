import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProjectCreateDTO {
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

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
