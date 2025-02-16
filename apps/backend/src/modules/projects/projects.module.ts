import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CreateProjectUseCase } from './application/create-project.use-case';
import { GetProjectUseCase } from './application/get-project.use-case';
import { UpdateProjectPromptUseCase } from './application/update-project-prompt.use-case';
import { PromptUpdateService } from './domain/can-update-prompt.service';
import { PROJECT_REPOSITORY } from './domain/project.repository.interface';
import { PrismaProjectRepository } from './infrastructure/prisma-project.repository';
import { ProjectMapper } from './presentation/project.mapper';
import { ProjectsController } from './presentation/projects.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    GetProjectUseCase,
    UpdateProjectPromptUseCase,
    PromptUpdateService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
    ProjectMapper,
  ],
  exports: [CreateProjectUseCase, GetProjectUseCase, UpdateProjectPromptUseCase],
})
export class ProjectsModule {}
