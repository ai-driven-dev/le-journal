import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case';
import { UserDomain } from '../domain/user.domain';

import { UserMapper } from './user.mapper';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly userMapper: UserMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès',
    type: [UserDomain],
  })
  async getAllUsers(): Promise<UserDomain[]> {
    const users = await this.getAllUsersUseCase.execute();

    return users.map((user) => this.userMapper.toDomain(user));
  }
}
