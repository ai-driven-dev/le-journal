import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PromptUpdateService } from '../domain/can-update-prompt.service';
import { ProjectDomain } from '../domain/project';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';
import { ProjectMapper } from '../presentation/project.mapper';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly projectMapper: ProjectMapper,
    private readonly promptUpdateService: PromptUpdateService,
  ) {}

  async execute(userId: string, projectNumber: number): Promise<ProjectDomain[]> {
    const projects = await this.projectRepository.findByUserIdAndProjectNumber(
      userId,
      projectNumber,
    );

    if (projects.length === 0) {
      throw new NotFoundException('Project not found');
    }

    return projects.map((project) => {
      const canUpdatePrompt = this.promptUpdateService.canUpdatePrompt(project.last_prompt_update);

      return this.projectMapper.toDomain(project, canUpdatePrompt);
    });
  }
}
