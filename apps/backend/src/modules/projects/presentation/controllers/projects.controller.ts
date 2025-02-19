import { Project } from '@le-journal/shared-types';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CheckOnboardingGuard } from '../../application/guards/check-onboarding.guard';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { UpdateProjectPromptUseCase } from '../../application/use-cases/update-project-prompt.use-case';
import { ProjectUpdate } from '../../domain/project-update';
import { ProjectMapper } from '../mappers/project.mapper';

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
  @UseGuards(JwtAuthGuard, CheckOnboardingGuard)
  async createProject(@GetUser() user: UserDomain): Promise<Project> {
    const projectDomain = await this.createProjectUseCase.execute({
      userId: user.id,
      userEmail: user.email,
    });

    return this.projectMapper.toDTO(projectDomain);
  }

  @Get()
  @ApiAuthOperation("Récupérer les projets de l'utilisateur connecté.", {
    type: [Project],
  })
  async getProject(@GetUser() user: User): Promise<Project[]> {
    const projects = await this.getProjectUseCase.execute(user.id);

    return projects.map((project) => this.projectMapper.toDTO(project));
  }

  @Get(':projectNumber')
  @ApiAuthOperation('Récupérer un projet par son numéro.', {
    type: Project,
  })
  @ApiParam({ name: 'projectNumber', required: true, type: Number })
  async getProjectByNumber(
    @Param('projectNumber') projectNumber: number,
    @GetUser() user: UserDomain,
  ): Promise<Project> {
    const projects = await this.getProjectUseCase.execute(user.id, projectNumber);

    if (projects.length === 0) {
      throw new NotFoundException(`Project with number ${projectNumber} not found`);
    }

    return this.projectMapper.toDTO(projects[0]);
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
