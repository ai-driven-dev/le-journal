import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class User {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UserCreate {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}
