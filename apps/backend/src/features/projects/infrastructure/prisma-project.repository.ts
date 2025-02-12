import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

import { ProjectRepository } from '../domain/project.repository.interface';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserIdAndProjectNumber(userId: string, projectNumber: number): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        user_id: userId,
        project_number: projectNumber,
      },
      take: 1,
    });
  }

  async create(data: {
    userId: string;
    name: string;
    slug: string;
    newsletterAlias: string;
    projectNumber: number;
  }): Promise<Project> {
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

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: {
        user_id_slug: {
          user_id: slug,
          slug,
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { user_id: userId },
    });
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }
}
