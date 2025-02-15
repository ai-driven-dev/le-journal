import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { validateSync } from 'class-validator';

import { ProjectCreateDomain } from '../domain/project-create';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(createProjectDto: ProjectCreateDomain): Promise<Project> {
    const errors = validateSync(createProjectDto);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid project data', { cause: errors });
    }

    const existingProject = await this.projectRepository.findBySlug(
      createProjectDto.userId,
      createProjectDto.slug,
    );

    if (existingProject) {
      throw new ConflictException('Project with this slug already exists');
    }

    // TODO: No mapper here, am I sure I want to create an other one?...
    return this.projectRepository.create({
      userId: createProjectDto.userId,
      name: createProjectDto.name,
      slug: createProjectDto.slug,
      newsletterAlias: createProjectDto.newsletterAlias,
      projectNumber: createProjectDto.projectNumber,
    });
  }
}
