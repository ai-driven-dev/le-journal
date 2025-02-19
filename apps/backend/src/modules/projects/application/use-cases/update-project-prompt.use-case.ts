import { PROMPT_UPDATE_FREQUENCY } from '@le-journal/shared-types';
import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PromptUpdateService } from '../../domain/can-update-prompt.service';
import { ProjectDomain } from '../../domain/project';
import { ProjectUpdate } from '../../domain/project-update';
import { PROJECT_REPOSITORY, ProjectRepository } from '../../domain/project.repository.interface';

import { UserDomain } from 'src/modules/users/domain/user.domain';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly promptUpdateService: PromptUpdateService,
  ) {}

  async execute(user: UserDomain, dto: ProjectUpdate): Promise<ProjectDomain> {
    const projectModel = await this.projectRepository.findById(dto.id);

    if (projectModel === null) {
      throw new NotFoundException(`Project with id ${dto.id} not found`);
    }

    const canUpdatePrompt = this.promptUpdateService.canUpdatePrompt(
      user.role,
      projectModel.lastPromptUpdate,
    );

    if (!canUpdatePrompt) {
      throw new ForbiddenException(
        `Vous ne pouvez modifier vos instructions qu'une fois toutes les ${PROMPT_UPDATE_FREQUENCY}h. Veuillez réessayer plus tard.`,
      );
    }

    const updatedProjectModel = await this.projectRepository.update(dto.id, {
      prompt_instruction: dto.promptInstruction,
      last_prompt_update: new Date(),
    });

    return updatedProjectModel;
  }
}
