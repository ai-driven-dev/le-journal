import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';
import { UpdateProjectPromptUseCase } from './application/use-cases/update-project-prompt.use-case';
import { PROJECT_REPOSITORY } from './domain/repositories/project.repository.interface';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';
import { ProjectsController } from './presentation/controllers/projects.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    GetProjectUseCase,
    UpdateProjectPromptUseCase,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [CreateProjectUseCase, GetProjectUseCase, UpdateProjectPromptUseCase],
})
export class ProjectsModule {}
