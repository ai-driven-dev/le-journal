import { CreateApiUser } from '@le-journal/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  /**
   * Crée un nouvel utilisateur.
   *
   * @throws {NotFoundException} Si l'utilisateur n'a pas pu être créé
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    createUserDto: CreateApiUser,
  ): Promise<User> {
    return this.createUserUseCase.execute(createUserDto.email, createUserDto.name);
  }

  /**
   * Récupère tous les utilisateurs.
   *
   * @throws {InternalServerErrorException} Si une erreur survient lors de la conversion des données
   */
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.getAllUsersUseCase.execute();
  }
}
