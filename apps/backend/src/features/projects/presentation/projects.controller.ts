import { Body, Controller, Get, Inject, OnModuleInit, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../users/domain/repositories/user.repository.interface';
import { CreateProjectUseCase } from '../application/create-project.use-case';
import { GetProjectUseCase } from '../application/get-project.use-case';
import { UpdateProjectPromptUseCase } from '../application/update-project-prompt.use-case';
import { Project } from '../domain/project';
import { CreateProjectDto } from '../domain/project-create';
import { ProjectUpdate } from '../domain/project-update';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

import { ProjectMapper } from './project.mapper';

// TODO: À remplacer par un middleware d'authentification
const TEMP_USER_EMAIL = 'user.standard@example.com';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController implements OnModuleInit {
  private userId = '';
  private projectId = '';

  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectPromptUseCase: UpdateProjectPromptUseCase,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly projectMapper: ProjectMapper,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.initializeProjectId();
  }

  private async initializeProjectId(): Promise<void> {
    const user = await this.userRepository.findByEmail(TEMP_USER_EMAIL);
    if (user === null) {
      throw new Error('User not found');
    }

    // TODO: -Bien sûr, cette saloperie est à supprimer.
    const projects = await this.projectRepository.findByUserId(user.id);
    if (projects.length === 0) {
      throw new Error('Project not found');
    }

    this.projectId = projects[0].id;
    this.userId = user.id;
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiResponse({ status: 201, type: CreateProjectDto })
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.createProjectUseCase.execute(createProjectDto);

    const instance = plainToInstance(Project, project);

    return instance;
  }

  @Get()
  @ApiOperation({ summary: "Récupérer le projet de l'utilisateur" })
  @ApiQuery({ name: 'projectNumber', required: false, type: Number, default: 1 })
  @ApiResponse({ status: 200, type: Project })
  async getProject(@Query('projectNumber') projectNumber: number): Promise<Project[]> {
    const projects = await this.getProjectUseCase.execute(this.userId, +projectNumber);

    return projects.map(this.projectMapper.toDto);
  }

  @Put('prompt')
  @ApiOperation({ summary: 'Mettre à jour les instructions du prompt du projet' })
  @ApiResponse({ status: 200, type: Project })
  async updateProjectPrompt(
    @Body()
    updateProjectPromptDto: ProjectUpdate,
  ): Promise<ProjectUpdate> {
    const project = await this.updateProjectPromptUseCase.execute(updateProjectPromptDto);

    return this.projectMapper.toDto(project);
  }
}
