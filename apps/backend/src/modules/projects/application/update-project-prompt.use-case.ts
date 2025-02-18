import { PROMPT_UPDATE_DELAY_HOURS } from '@le-journal/shared-types';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PromptUpdateService } from '../domain/can-update-prompt.service';
import { ProjectDomain } from '../domain/project';
import { ProjectUpdate } from '../domain/project-update';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly promptUpdateService: PromptUpdateService,
  ) {}

  async execute(dto: ProjectUpdate): Promise<ProjectDomain> {
    const projectModel = await this.projectRepository.findById(dto.id);

    if (projectModel === null) {
      throw new NotFoundException(`Project with id ${dto.id} not found`);
    }

    const canUpdatePrompt = this.promptUpdateService.canUpdatePrompt(projectModel.lastPromptUpdate);

    if (!canUpdatePrompt) {
      throw new ForbiddenException(
        `You can only update your prompt once every ${PROMPT_UPDATE_DELAY_HOURS} hours. Please try again later.`,
      );
    }

    const updatedProjectModel = await this.projectRepository.update(dto.id, {
      prompt_instruction: dto.promptInstruction,
      last_prompt_update: new Date(),
    });

    return updatedProjectModel;
  }
}
