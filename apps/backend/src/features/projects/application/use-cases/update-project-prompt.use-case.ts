import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../domain/repositories/project.repository.interface';
import { UpdateProjectPromptDto } from '../../presentation/dtos/project.dto';

import { AppLogger } from 'src/infrastructure/logging/logger.service';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(dto: UpdateProjectPromptDto): Promise<Project> {
    this.logger.debug('Updating Project Prompt', this.constructor.name, {
      projectId: dto.id,
      promptInstruction: dto.promptInstruction,
    });

    const project = await this.projectRepository.findById(dto.id);

    if (project === null) {
      throw new NotFoundException(`Project with id ${dto.id} not found`);
    }

    const updatedProject = await this.projectRepository.update(dto.id, {
      prompt_instruction: dto.promptInstruction,
    });

    this.logger.success('Project Prompt Updated', this.constructor.name, {
      projectId: dto.id,
      promptInstruction: updatedProject.prompt_instruction,
    });

    return updatedProject;
  }
}
