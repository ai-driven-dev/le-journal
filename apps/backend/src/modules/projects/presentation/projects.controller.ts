import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { GetProjectUseCase } from '../application/get-project.use-case';
import { UpdateProjectPromptUseCase } from '../application/update-project-prompt.use-case';
import { ProjectDomain } from '../domain/project';
import { ProjectUpdate } from '../domain/project-update';

import { ProjectMapper } from './project.mapper';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt.guard';

@ApiTags('Projects')
@Controller('api/projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectPromptUseCase: UpdateProjectPromptUseCase,
    private readonly projectMapper: ProjectMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: "Récupérer le projet de l'utilisateur" })
  @ApiQuery({ name: 'projectNumber', required: false, type: Number, default: 1 })
  @ApiResponse({ status: 200, type: ProjectDomain })
  async getProject(
    @Query('projectNumber') projectNumber: number,
    @GetUser() user: User,
  ): Promise<ProjectDomain[]> {
    const projects = await this.getProjectUseCase.execute(user.id, projectNumber);

    return projects.map(this.projectMapper.toDomain);
  }

  @Put('prompt')
  @ApiOperation({ summary: 'Mettre à jour les instructions du prompt du projet' })
  @ApiResponse({ status: 200, type: ProjectUpdate })
  async updateProjectPrompt(
    @Body()
    updateProjectPromptDto: ProjectUpdate,
    @GetUser() user: User,
  ): Promise<ProjectUpdate> {
    const project = await this.updateProjectPromptUseCase.execute(updateProjectPromptDto);

    return this.projectMapper.toDomain(project);
  }
}
