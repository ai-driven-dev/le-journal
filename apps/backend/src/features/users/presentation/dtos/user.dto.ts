export class CreateUserDto {
  email: string;
  name?: string;
}

export class UserResponseDto {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}
