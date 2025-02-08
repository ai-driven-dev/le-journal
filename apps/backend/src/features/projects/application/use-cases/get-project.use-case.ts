import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../domain/repositories/project.repository.interface';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
