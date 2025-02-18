import { ConflictException, Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

import { ProjectDomain } from '../domain/project';
import { ProjectCreateDomain } from '../domain/project-create';
import { FindByCondition, ProjectRepository } from '../domain/project.repository.interface';
import { CreateProjectMapper } from '../presentation/create-project.mapper';
import { ProjectMapper } from '../presentation/project.mapper';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectMapper: ProjectMapper,
    private readonly createProjectMapper: CreateProjectMapper,
  ) {}

  async findBy(conditions: FindByCondition[]): Promise<ProjectDomain[]> {
    const where = conditions.reduce((acc, condition) => {
      return {
        ...acc,
        [condition.key]: condition.value,
      };
    }, {});

    const projects = await this.prisma.project.findMany({
      where,
    });

    return projects.map((project) => this.projectMapper.toDomain(project, true));
  }

  async findByUserIdAndProjectNumber(
    userId: Project['user_id'],
    projectNumber: Project['project_number'],
  ): Promise<ProjectDomain[]> {
    const projects = await this.prisma.project.findMany({
      where: {
        user_id: userId,
        project_number: projectNumber,
      },
      take: 1,
    });

    return projects.map((project) => this.projectMapper.toDomain(project, true));
  }

  async create(data: ProjectCreateDomain): Promise<ProjectDomain> {
    const existingProject = await this.findBySlug(data.userId, data.slug);

    if (existingProject) {
      throw new ConflictException('Project with this slug already exists');
    }

    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        slug: data.slug,
        newsletter_alias: data.newsletterAlias,
        project_number: data.projectNumber,
        user: {
          connect: { id: data.userId },
        },
        prompt_instruction: '',
      },
    });

    return this.projectMapper.toDomain(project, true);
  }

  async findById(id: Project['id']): Promise<ProjectDomain | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    return project ? this.projectMapper.toDomain(project, true) : null;
  }

  async findBySlug(
    user_id: Project['user_id'],
    slug: Project['slug'],
  ): Promise<ProjectDomain | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        user_id_slug: {
          user_id,
          slug,
        },
      },
    });

    return project ? this.projectMapper.toDomain(project, true) : null;
  }

  async findByUserId(user_id: Project['user_id']): Promise<ProjectDomain[]> {
    const projects = await this.prisma.project.findMany({
      where: { user_id },
    });

    return projects.map((project) => this.projectMapper.toDomain(project, true));
  }

  async update(id: Project['id'], data: Partial<Project>): Promise<ProjectDomain> {
    const project = await this.prisma.project.update({
      where: { id },
      data,
    });

    return this.projectMapper.toDomain(project, true);
  }
}
