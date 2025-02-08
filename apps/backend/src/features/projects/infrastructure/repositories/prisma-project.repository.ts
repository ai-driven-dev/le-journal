import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';

import { PrismaService } from '../../../../prisma/prisma.service';
import { ProjectRepository } from '../../domain/repositories/project.repository.interface';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

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
      where: { slug },
    });
  }

  async update(
    id: string,
    data: { name?: string; slug?: string; promptInstruction?: string },
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }
}
