import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

import { CreateProjectDto } from '../domain/project-create';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(createProjectDto: CreateProjectDto): Promise<Project> {
    const existingProject = await this.projectRepository.findBySlug(createProjectDto.slug);
    if (existingProject) {
      throw new ConflictException('Project with this slug already exists');
    }

    return this.projectRepository.create({
      userId: createProjectDto.userId,
      name: createProjectDto.name,
      slug: createProjectDto.slug,
      newsletterAlias: createProjectDto.newsletterAlias,
      projectNumber: createProjectDto.projectNumber,
    });
  }
}
