import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case';
import { UserDomain } from '../domain/user.domain';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt.guard';

@ApiTags('Users')
@Controller('api/users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get('me')
  @ApiOperation({ summary: "Récupérer l'utilisateur connecté" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur connecté récupéré avec succès',
    type: UserDomain,
  })
  async getMe(@GetUser() user: UserDomain): Promise<UserDomain> {
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs récupérée avec succès',
    type: [UserDomain],
  })
  async getAllUsers(): Promise<UserDomain[]> {
    return this.getAllUsersUseCase.execute();
  }
}
