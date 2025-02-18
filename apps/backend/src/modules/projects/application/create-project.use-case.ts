import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';

import { ProjectDomain } from '../domain/project';
import { ProjectCreateDomain } from '../domain/project-create';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';

interface CreateProjectCommand {
  userId: string;
  userEmail: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(command: CreateProjectCommand): Promise<ProjectDomain> {
    const projectCreateDomain = this.createInitialProject(command);

    const errors = validateSync(projectCreateDomain);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid project data', { cause: errors });
    }

    const existingProject = await this.projectRepository.findBySlug(
      projectCreateDomain.userId,
      projectCreateDomain.slug,
    );

    if (existingProject) {
      throw new ConflictException('Project with this slug already exists');
    }

    return await this.projectRepository.create(projectCreateDomain);
  }

  private createInitialProject(command: CreateProjectCommand): ProjectCreateDomain {
    const { userId, userEmail } = command;

    // Business logic for creating newsletter alias
    const emailParts = userEmail.split('@');
    const newsletterAlias = `${emailParts[0]}+le-journal@${emailParts[1]}`;

    // Business logic for initial project values
    return new ProjectCreateDomain({
      name: 'Default',
      slug: 'default',
      newsletterAlias,
      projectNumber: 1,
      userId,
    });
  }
}
