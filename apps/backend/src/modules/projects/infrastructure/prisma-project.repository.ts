import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';

import { ProjectDomain } from '../domain/project';
import { ProjectCreateDomain } from '../domain/project-create';
import { FindByCondition, ProjectRepository } from '../domain/project.repository.interface';
import { ProjectMapper } from '../presentation/mappers/project.mapper';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectMapper: ProjectMapper,
    private readonly logger: Logger,
  ) {}

  async findGoogleInfo(projectId: Project['id']): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Projet non trouvé avec l'identifiant ${projectId}`);
    }

    return project;
  }

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
    this.logger.log('Creating project', this.constructor.name, {
      name: data.name,
      slug: data.slug,
      userId: data.userId,
      projectNumber: data.projectNumber,
    });

    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        slug: data.slug,
        email_alias: data.emailAlias,
        project_number: data.projectNumber,
        user: {
          connect: { id: data.userId },
        },
        prompt_instruction: '',
        google_label_name: '',
        google_label_id: '',
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

  public async findSlugForUser(user_id: Project['user_id']): Promise<Project['slug'][]> {
    const projects = await this.prisma.project.findMany({
      select: {
        slug: true,
      },
      where: {
        user_id,
      },
    });

    return projects.map((project) => project.slug);
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
