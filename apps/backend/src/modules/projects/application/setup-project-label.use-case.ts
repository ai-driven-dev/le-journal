import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { GoogleService } from '../../../infrastructure/google/google.service';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

const LABEL_PREFIX = 'Le Journal';

@Injectable()
export class SetupProjectLabelUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly googleService: GoogleService,
  ) {}

  async execute(userId: string, projectId: string): Promise<boolean> {
    const projects = await this.projectRepository.findBy([
      { key: 'id', value: projectId },
      { key: 'user_id', value: userId },
    ]);

    if (projects.length === 0) {
      throw new NotFoundException(`Project not found with id ${projectId} for user id ${userId}`);
    }

    const project = projects[0];

    const label = await this.googleService.createGmailLabel(
      userId,
      `${LABEL_PREFIX} - ${project.name}`,
    );

    if (label.id) {
      return true;
    }

    return false;
  }
}
