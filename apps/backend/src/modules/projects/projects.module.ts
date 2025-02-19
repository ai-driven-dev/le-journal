import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { EmailModule } from '../../infrastructure/email/email.module';
import { GoogleModule } from '../../infrastructure/google/google.module';

import { CheckOnboardingGuard } from './application/guards/check-onboarding.guard';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';
import { CompleteOnboardingUseCase } from './application/use-cases/setup/setup-complete-onboarding.use-case';
import { SetupFilterUseCase } from './application/use-cases/setup/setup-filter.use-case';
import { SetupProjectLabelUseCase } from './application/use-cases/setup/setup-project-label.use-case';
import { SetupTestEmailUseCase } from './application/use-cases/setup/setup-test-email.use-case';
import { UpdateProjectPromptUseCase } from './application/use-cases/update-project-prompt.use-case';
import { PromptUpdateService } from './domain/can-update-prompt.service';
import { PROJECT_REPOSITORY } from './domain/project.repository.interface';
import { PrismaProjectRepository } from './infrastructure/prisma-project.repository';
import { ProjectSetupController } from './presentation/controllers/project-setup.controller';
import { ProjectsController } from './presentation/controllers/projects.controller';
import { ProjectMapper } from './presentation/mappers/project.mapper';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    GoogleModule,
    EmailModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [ProjectsController, ProjectSetupController],
  providers: [
    SetupProjectLabelUseCase,
    SetupFilterUseCase,
    GetProjectUseCase,
    SetupTestEmailUseCase,
    CompleteOnboardingUseCase,
    CreateProjectUseCase,
    UpdateProjectPromptUseCase,
    CheckOnboardingGuard,
    ProjectMapper,
    PromptUpdateService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY],
})
export class ProjectsModule {}
