import { IsDate, IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
  REGULAR = 'REGULAR',
}

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

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}
