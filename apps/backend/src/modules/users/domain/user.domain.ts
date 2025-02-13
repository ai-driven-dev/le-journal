import { User, UserRole } from '@le-journal/shared-types';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserDomain extends User {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: "ID de l'utilisateur",
  })
  id!: string;

  @ApiProperty({ example: 'john.doe@email.com', description: "Email de l'utilisateur" })
  email!: string;

  @ApiProperty({ example: 'ADMIN', description: "Rôle de l'utilisateur" })
  role!: UserRole;

  @ApiProperty({ example: 'John Doe', description: "Nom de l'utilisateur" })
  name!: string;

  @ApiProperty({ example: '2024-02-08T12:00:00.000Z', description: 'Date de création' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-02-09T14:30:00.000Z', description: 'Date de mise à jour' })
  updatedAt!: Date;

  @Exclude()
  @ApiHideProperty()
  refreshToken!: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: "Avatar de l'utilisateur",
  })
  avatar!: string;
}
