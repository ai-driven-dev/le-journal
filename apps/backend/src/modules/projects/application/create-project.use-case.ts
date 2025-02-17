import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';

import { ProjectDomain } from '../domain/project';
import { PROJECT_REPOSITORY, ProjectRepository } from '../domain/project.repository.interface';
import { ProjectMapper } from '../presentation/project.mapper';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly projectMapper: ProjectMapper,
  ) {}

  async execute(userId: string, userEmail: string): Promise<ProjectDomain> {
    // From contact.alexsoyes@gmail.com
    const emailParts = userEmail.split('@');
    // To contact.alexsoyes+le-journal@gmail.com
    const newsletterAlias = `${emailParts[0]}+le-journal@${emailParts[1]}`;

    const createProjectDto = {
      name: 'Default',
      slug: 'default',
      newsletterAlias,
      projectNumber: 1,
      userId,
    };

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

    const projectCreated = await this.projectRepository.create(createProjectDto);

    return this.projectMapper.toDomain(projectCreated, true);
  }
}
