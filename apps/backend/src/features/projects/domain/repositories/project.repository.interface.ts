import type { Project } from '@prisma/client';

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';

export interface ProjectRepository {
  create(data: {
    userId: string;
    name: string;
    slug: string;
    newsletterAlias: string;
    projectNumber: number;
  }): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  update(
    id: string,
    data: { name?: string; slug?: string; promptInstruction?: string; newsletterAlias?: string },
  ): Promise<Project>;
}
