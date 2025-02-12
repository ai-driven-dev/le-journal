import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(userId: string, projectNumber: number): Promise<Project[]> {
    const projects = await this.projectRepository.findByUserIdAndProjectNumber(
      userId,
      projectNumber,
    );

    if (projects.length === 0) {
      throw new NotFoundException('Project not found');
    }

    return projects;
  }
}
