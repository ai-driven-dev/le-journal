import { Project } from '@le-journal/shared-types';
import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CreateProjectUseCase } from '../application/create-project.use-case';
import { GetProjectUseCase } from '../application/get-project.use-case';
import { UpdateProjectPromptUseCase } from '../application/update-project-prompt.use-case';
import { ProjectUpdate } from '../domain/project-update';

import { ProjectMapper } from './project.mapper';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt.guard';
import { ApiAuthOperation } from 'src/infrastructure/http/api-data-response.decorator';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@ApiTags('Projects')
@Controller('api/projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectPromptUseCase: UpdateProjectPromptUseCase,
    private readonly projectMapper: ProjectMapper,
  ) {}

  @Post('create')
  @ApiAuthOperation('Créer un nouveau projet.', {
    type: Project,
  })
  async createProject(@GetUser() user: UserDomain): Promise<Project> {
    const projectDomain = await this.createProjectUseCase.execute({
      userId: user.id,
      userEmail: user.email,
    });

    return this.projectMapper.toDTO(projectDomain);
  }

  @Get()
  @ApiAuthOperation("Récupérer les projets de l'utilisateur connecté.", {
    type: Project,
    isArray: true,
    query: { name: 'projectNumber', required: false, type: Number, default: 1 },
  })
  async getProject(
    @Query('projectNumber') projectNumber: number,
    @GetUser() user: User,
  ): Promise<Project[]> {
    const projects = await this.getProjectUseCase.execute(user.id, projectNumber);

    return projects.map((project) => this.projectMapper.toDTO(project));
  }

  @Put('prompt')
  @ApiAuthOperation('Mise à jour des instructions de prompt pour un projet.', {
    type: Project,
  })
  async updateProjectPrompt(
    @Body()
    updateProjectPromptDto: ProjectUpdate,
  ): Promise<Project> {
    const project = await this.updateProjectPromptUseCase.execute(updateProjectPromptDto);

    return this.projectMapper.toDTO(project);
  }
}
