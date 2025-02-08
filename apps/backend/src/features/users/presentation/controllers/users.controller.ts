import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { CreateUserDto, UserDto } from '../dtos/user.dto';

@ApiTags('Users')
@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Utilisateur créé avec succès',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Un utilisateur avec cet email existe déjà',
  })
  async createUser(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    const user = await this.createUserUseCase.execute(createUserDto.email, createUserDto.name);
    return new UserDto(user);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès',
    type: [UserDto],
  })
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.getAllUsersUseCase.execute();
    return users.map((user) => new UserDto(user));
  }
}
