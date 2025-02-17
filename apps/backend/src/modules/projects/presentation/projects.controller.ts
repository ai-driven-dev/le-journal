import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CreateProjectUseCase } from '../application/create-project.use-case';
import { GetProjectUseCase } from '../application/get-project.use-case';
import { SetupProjectLabelUseCase } from '../application/setup-project-label.use-case';
import { UpdateProjectPromptUseCase } from '../application/update-project-prompt.use-case';
import { ProjectDomain } from '../domain/project';
import { ProjectUpdate } from '../domain/project-update';

import { GetUser } from 'src/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt.guard';
import { UserDomain } from 'src/modules/users/domain/user.domain';

@ApiTags('Projects')
@Controller('api/projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly setupProjectLabelUseCase: SetupProjectLabelUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectPromptUseCase: UpdateProjectPromptUseCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new project.' })
  @ApiResponse({ status: 200, type: ProjectDomain })
  async createProject(@GetUser() user: UserDomain): Promise<ProjectDomain> {
    return await this.createProjectUseCase.execute(user.id, user.email);
  }

  @Post('setup/label')
  @ApiOperation({ summary: 'Create a new project from an email.' })
  @ApiResponse({ status: 200, type: ProjectDomain })
  @ApiBody({
    schema: {
      properties: {
        projectId: { type: 'string', example: 'c123e456-789b-12d3-a456-426614174000' },
      },
    },
  })
  async createProjectFromEmail(
    @GetUser() user: UserDomain,
    @Body('projectId') projectId: string,
  ): Promise<boolean> {
    return await this.setupProjectLabelUseCase.execute(user.id, projectId);
  }

  @Get()
  @ApiOperation({ summary: 'Get projects from connected user.' })
  @ApiQuery({ name: 'projectNumber', required: false, type: Number, default: 1 })
  @ApiResponse({ status: 200, type: ProjectDomain })
  async getProject(
    @Query('projectNumber') projectNumber: number,
    @GetUser() user: User,
  ): Promise<ProjectDomain[]> {
    return await this.getProjectUseCase.execute(user.id, projectNumber);
  }

  @Put('prompt')
  @ApiOperation({ summary: "Update project's prompt instructions." })
  @ApiResponse({ status: 200, type: ProjectUpdate })
  async updateProjectPrompt(
    @Body()
    updateProjectPromptDto: ProjectUpdate,
  ): Promise<ProjectDomain> {
    return await this.updateProjectPromptUseCase.execute(updateProjectPromptDto);
  }
}
