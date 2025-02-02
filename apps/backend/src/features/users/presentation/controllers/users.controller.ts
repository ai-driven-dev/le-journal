import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { CreateUserDto, UserResponseDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(
      createUserDto.email,
      createUserDto.name,
    );
    const response = user.toJSON();
    if (!response.id) {
      throw new NotFoundException('User was not created properly');
    }
    return response as UserResponseDto;
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute();
    return users.map((user) => {
      const response = user.toJSON();
      if (!response.id) {
        throw new NotFoundException('User was not created properly');
      }
      return response as UserResponseDto;
    });
  }
}
