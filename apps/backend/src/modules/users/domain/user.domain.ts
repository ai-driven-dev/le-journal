import { User, UserRole } from '@le-journal/shared-types';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserDomain extends User {
  @ApiProperty({
    example: 'c123e456-789b-12d3-a456-426614174000',
    description: "User's ID",
  })
  id!: string;

  @ApiProperty({ example: 'john.doe@email.com', description: "User's email" })
  email!: string;

  @ApiProperty({ example: 'ADMIN', description: "User's role" })
  role!: UserRole;

  @ApiProperty({ example: 'John Doe', description: "User's name" })
  name!: string;

  @ApiProperty({ example: '2024-02-08T12:00:00.000Z', description: 'Creation date' })
  createdAt!: Date;

  @ApiProperty({ example: '2024-02-09T14:30:00.000Z', description: 'Last update date' })
  updatedAt!: Date;

  @Exclude()
  @ApiHideProperty()
  googleRefreshToken!: string;

  @Exclude()
  @ApiHideProperty()
  googleScopes!: string[];

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: "User's avatar URL",
  })
  avatar!: string;

  @ApiProperty({
    example: 'google-123',
    description: "User's Google ID",
  })
  googleId!: string;

  constructor(user: UserDomain) {
    super();
    Object.assign(this, user);
  }
}
