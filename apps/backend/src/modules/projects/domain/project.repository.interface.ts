import type { Project } from '@prisma/client';

import type { ProjectCreateDomain } from './project-create';

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';

export type FindByCondition = {
  key: keyof Project;
  value: unknown;
};

export interface ProjectRepository {
  create(data: ProjectCreateDomain): Promise<Project>;
  findById(id: Project['id']): Promise<Project | null>;
  findBySlug(user_id: Project['user_id'], slug: Project['slug']): Promise<Project | null>;
  findByUserId(userId: Project['user_id']): Promise<Project[]>;
  findByUserIdAndProjectNumber(
    userId: Project['user_id'],
    projectNumber: Project['project_number'],
  ): Promise<Project[]>;
  findBy(conditions: FindByCondition[]): Promise<Project[]>;
  update(id: Project['id'], data: Partial<Project>): Promise<Project>;
}
