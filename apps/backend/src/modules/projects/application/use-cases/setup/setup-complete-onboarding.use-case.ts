import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../../domain/project.repository.interface';

@Injectable()
export class CompleteOnboardingUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger,
  ) {}

  async execute(projectId: string): Promise<boolean> {
    try {
      this.logger.log(`Completing onboarding for project ${projectId}`);

      await this.projectRepository.update(projectId, {
        onboarding_completed_at: new Date(),
      });

      this.logger.log(`Onboarding completed for project ${projectId}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to complete onboarding for project ${projectId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      return false;
    }
  }
}
