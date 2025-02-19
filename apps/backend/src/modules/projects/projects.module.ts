import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CheckOnboardingGuard } from './application/guards/check-onboarding.guard';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';
import { SetupFilterUseCase } from './application/use-cases/setup-filter.use-case';
import { SetupProjectLabelUseCase } from './application/use-cases/setup-project-label.use-case';
import { UpdateProjectPromptUseCase } from './application/use-cases/update-project-prompt.use-case';
import { PromptUpdateService } from './domain/can-update-prompt.service';
import { PROJECT_REPOSITORY } from './domain/project.repository.interface';
import { PrismaProjectRepository } from './infrastructure/prisma-project.repository';
import { ProjectSetupController } from './presentation/controllers/project-setup.controller';
import { ProjectsController } from './presentation/controllers/projects.controller';
import { CreateProjectMapper } from './presentation/mappers/create-project.mapper';
import { ProjectMapper } from './presentation/mappers/project.mapper';

import { GoogleModule } from 'src/infrastructure/google/google.module';

@Module({
  imports: [PrismaModule, GoogleModule],
  controllers: [ProjectsController, ProjectSetupController],
  providers: [
    CheckOnboardingGuard,
    CreateProjectUseCase,
    SetupProjectLabelUseCase,
    SetupFilterUseCase,
    GetProjectUseCase,
    UpdateProjectPromptUseCase,
    PromptUpdateService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
    ProjectMapper,
    CreateProjectMapper,
  ],
  exports: [CreateProjectUseCase, GetProjectUseCase, UpdateProjectPromptUseCase],
})
export class ProjectsModule {}
