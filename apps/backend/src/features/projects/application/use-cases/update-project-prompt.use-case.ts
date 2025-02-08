import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../domain/repositories/project.repository.interface';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(projectId: string, promptInstruction: string): Promise<Project> {
    const project = await this.projectRepository.findById(projectId);

    if (project === null) {
      throw new NotFoundException('Project not found');
    }

    return this.projectRepository.update(projectId, { promptInstruction });
  }
}
