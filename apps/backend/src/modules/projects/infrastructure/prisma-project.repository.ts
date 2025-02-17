import { ConflictException, Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

import { ProjectCreateDomain } from '../domain/project-create';
import { FindByCondition, ProjectRepository } from '../domain/project.repository.interface';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(conditions: FindByCondition[]): Promise<Project[]> {
    const where = conditions.reduce((acc, condition) => {
      return {
        ...acc,
        [condition.key]: condition.value,
      };
    }, {});

    return this.prisma.project.findMany({
      where,
    });
  }

  async findByUserIdAndProjectNumber(
    userId: Project['user_id'],
    projectNumber: Project['project_number'],
  ): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        user_id: userId,
        project_number: projectNumber,
      },
      take: 1,
    });
  }

  async create(data: ProjectCreateDomain): Promise<Project> {
    const existingProject = await this.findBySlug(data.userId, data.slug);

    if (existingProject) {
      throw new ConflictException('Project with this slug already exists');
    }

    return this.prisma.project.create({
      data: {
        name: data.name,
        slug: data.slug,
        newsletter_alias: data.newsletterAlias,
        project_number: data.projectNumber,
        user: {
          connect: { id: data.userId },
        },
      },
    });
  }

  async findById(id: Project['id']): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findBySlug(user_id: Project['user_id'], slug: Project['slug']): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: {
        user_id_slug: {
          user_id,
          slug,
        },
      },
    });
  }

  async findByUserId(user_id: Project['user_id']): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { user_id },
    });
  }

  async update(id: Project['id'], data: Partial<Project>): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }
}
