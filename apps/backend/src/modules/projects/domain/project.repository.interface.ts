import type { Project } from '@prisma/client';

import type { ProjectDomain } from './project';
import type { ProjectCreateDomain } from './project-create';

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';

export type FindByCondition = {
  key: keyof Project;
  value: unknown;
};

export interface ProjectRepository {
  create(data: ProjectCreateDomain): Promise<ProjectDomain>;
  findById(id: Project['id']): Promise<ProjectDomain | null>;
  findByUserId(userId: Project['user_id']): Promise<ProjectDomain[]>;
  findByUserIdAndProjectNumber(
    userId: Project['user_id'],
    projectNumber: Project['project_number'],
  ): Promise<ProjectDomain[]>;
  findSlugForUser(user_id: Project['user_id']): Promise<Project['slug'][]>;
  findGoogleInfo(projectId: Project['id']): Promise<Project>;
  findBy(conditions: FindByCondition[]): Promise<ProjectDomain[]>;
  update(id: Project['id'], data: Partial<Project>): Promise<ProjectDomain>;
}
