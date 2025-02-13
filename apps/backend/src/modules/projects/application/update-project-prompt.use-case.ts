import { PROMPT_UPDATE_DELAY_HOURS } from '@le-journal/shared-types';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ProjectDomain } from '../domain/project';
import { ProjectUpdate } from '../domain/project-update';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';
import { ProjectMapper } from '../presentation/project.mapper';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly projectMapper: ProjectMapper,
  ) {}

  private canUpdatePrompt(lastPromptUpdate: Date | null): boolean {
    if (lastPromptUpdate === null) {
      return true;
    }

    const now = new Date();
    const hoursSinceLastUpdate = (now.getTime() - lastPromptUpdate.getTime()) / (1000 * 60 * 60);

    return hoursSinceLastUpdate >= PROMPT_UPDATE_DELAY_HOURS;
  }

  async execute(dto: ProjectUpdate): Promise<ProjectDomain> {
    const projectModel = await this.projectRepository.findById(dto.id);

    if (projectModel === null) {
      throw new NotFoundException(`Project with id ${dto.id} not found`);
    }

    const project = this.projectMapper.toDomain(projectModel);

    if (!this.canUpdatePrompt(project.lastPromptUpdate ?? null)) {
      throw new ForbiddenException(
        `You can only update your prompt once every ${PROMPT_UPDATE_DELAY_HOURS} hours. Please try again later.`,
      );
    }

    const updatedProjectModel = await this.projectRepository.update(dto.id, {
      prompt_instruction: dto.promptInstruction,
      last_prompt_update: new Date(),
    });

    const updatedProject = this.projectMapper.toDomain(updatedProjectModel);
    updatedProject.canUpdatePrompt = this.canUpdatePrompt(updatedProject.lastPromptUpdate ?? null);

    return updatedProject;
  }
}
