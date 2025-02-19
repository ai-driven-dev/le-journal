import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PromptUpdateService } from '../../domain/can-update-prompt.service';
import { ProjectDomain } from '../../domain/project';
import { PROJECT_REPOSITORY, ProjectRepository } from '../../domain/project.repository.interface';

import { UserDomain } from 'src/modules/users/domain/user.domain';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly promptUpdateService: PromptUpdateService,
  ) {}

  async execute(user: UserDomain, projectNumber?: number): Promise<ProjectDomain[]> {
    let projects = [];

    if (projectNumber) {
      projects = await this.projectRepository.findBy([
        { key: 'user_id', value: user.id },
        { key: 'project_number', value: projectNumber },
      ]);
    } else {
      projects = await this.projectRepository.findBy([{ key: 'user_id', value: user.id }]);
    }

    if (projects.length === 0) {
      throw new NotFoundException('Project not found');
    }

    return projects.map((project) => {
      project.canUpdatePrompt = this.promptUpdateService.canUpdatePrompt(
        user.role,
        project.lastPromptUpdate,
      );
      return project;
    });
  }
}
