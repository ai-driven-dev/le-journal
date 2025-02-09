import { User } from '@le-journal/shared-types';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ example: 'john.doe@email.com', description: "Email de l'utilisateur" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'John Doe', description: "Nom de l'utilisateur", required: false })
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserDTO implements User {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: "ID de l'utilisateur",
  })
  id: string;

  @ApiProperty({ example: 'john.doe@email.com', description: "Email de l'utilisateur" })
  email: string;

  @ApiProperty({ example: 'John Doe', description: "Nom de l'utilisateur", required: false })
  name?: string;

  @ApiProperty({ example: '2024-02-08T12:00:00.000Z', description: 'Date de création' })
  createdAt: string;

  @ApiProperty({ example: '2024-02-09T14:30:00.000Z', description: 'Date de mise à jour' })
  updatedAt: string;

  constructor(user: PrismaUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name ?? undefined;
    this.createdAt = user.created_at.toISOString();
    this.updatedAt = user.updated_at.toISOString();
  }
}
