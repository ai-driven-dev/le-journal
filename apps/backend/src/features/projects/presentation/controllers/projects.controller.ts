import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { UpdateProjectPromptUseCase } from '../../application/use-cases/update-project-prompt.use-case';
import { CreateProjectDto, ProjectDto } from '../dtos/project.dto';

@ApiTags('Projects')
@Controller('projects')
@UsePipes(new ValidationPipe())
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectPromptUseCase: UpdateProjectPromptUseCase,
  ) {}

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

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un projet par son ID' })
  @ApiResponse({ status: 200, type: ProjectDto })
  async getProject(@Param('id') id: string): Promise<ProjectDto> {
    const project = await this.getProjectUseCase.execute(id);
    return new ProjectDto(project);
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
