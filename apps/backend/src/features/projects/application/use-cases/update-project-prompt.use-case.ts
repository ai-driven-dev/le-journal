import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../domain/repositories/project.repository.interface';

import { AppLogger } from 'src/infrastructure/logging/logger.service';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(projectId: string, promptInstruction: string): Promise<Project> {
    this.logger.debug(
      `Updating Project Prompt - projectId: ${projectId}, newPrompt: ${promptInstruction}`,
      'UpdateProjectPromptUseCase',
    );

    const project = await this.projectRepository.findById(projectId);

    if (project === null) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const updatedProject = await this.projectRepository.update(projectId, { promptInstruction });

    this.logger.success(
      `Project Prompt Updated - projectId: ${projectId}, newPrompt: ${updatedProject.prompt_instruction}`,
      'UpdateProjectPromptUseCase',
    );

    return updatedProject;
  }
}
