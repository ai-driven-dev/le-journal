import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../users/domain/repositories/user.repository.interface';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { UpdateProjectPromptUseCase } from '../../application/use-cases/update-project-prompt.use-case';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../domain/repositories/project.repository.interface';
import { CreateProjectDto, ProjectDto } from '../dtos/project.dto';

// TODO: À remplacer par un middleware d'authentification
const TEMP_USER_EMAIL = 'user.standard@example.com';

@ApiTags('Projects')
@Controller('projects')
@UsePipes(new ValidationPipe())
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
  @ApiResponse({ status: 201, type: ProjectDto })
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    const project = await this.createProjectUseCase.execute({
      userId: createProjectDto.userId,
      name: createProjectDto.name,
      slug: createProjectDto.slug,
      newsletterAlias: createProjectDto.newsletterAlias,
      projectNumber: createProjectDto.projectNumber,
    });

    return new ProjectDto(project);
  }

  @Get()
  @ApiOperation({ summary: "Récupérer le projet de l'utilisateur" })
  @ApiResponse({ status: 200, type: ProjectDto })
  async getProject(@Query('projectNumber') projectNumber: number): Promise<ProjectDto[]> {
    const projects = await this.getProjectUseCase.execute(this.userId, +projectNumber);
    return projects.map((project) => new ProjectDto(project));
  }

  @Put(':id/prompt')
  @ApiOperation({ summary: 'Mettre à jour les instructions du prompt du projet' })
  @ApiResponse({ status: 200, type: ProjectDto })
  async updateProjectPrompt(
    @Param('id') id: string,
    @Body('promptInstruction') promptInstruction: string,
  ): Promise<ProjectDto> {
    const project = await this.updateProjectPromptUseCase.execute(id, promptInstruction);
    return new ProjectDto(project);
  }
}
