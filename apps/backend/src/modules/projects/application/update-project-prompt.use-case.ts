import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import { ProjectUpdate } from '../domain/project-update';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

@Injectable()
export class UpdateProjectPromptUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(dto: ProjectUpdate): Promise<Project> {
    const project = await this.projectRepository.findById(dto.id);

    if (project === null) {
      throw new NotFoundException(`Project with id ${dto.id} not found`);
    }

    const updatedProject = await this.projectRepository.update(dto.id, {
      prompt_instruction: dto.promptInstruction,
    });

    return updatedProject;
  }
}
