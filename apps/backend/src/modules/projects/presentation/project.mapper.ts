import { Injectable } from '@nestjs/common';

import { ProjectDomain } from '../domain/project';

import { Mapper } from 'src/presentation/mapper.interface';
import { ProjectModel } from 'src/prisma/prisma.types';

@Injectable()
export class ProjectMapper implements Mapper<ProjectDomain, ProjectModel> {
  toModel(domain: ProjectDomain): ProjectModel {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      newsletter_alias: domain.newsletterAlias,
      project_number: domain.projectNumber,
      created_at: domain.createdAt,
      prompt_instruction: domain.promptInstruction,
      last_prompt_update: domain.lastPromptUpdate ?? null,
    };
  }

  toDomain(model: ProjectModel, canUpdatePrompt: boolean): ProjectDomain {
    const project = new ProjectDomain({
      id: model.id,
      name: model.name,
      slug: model.slug,
      newsletterAlias: model.newsletter_alias,
      projectNumber: model.project_number,
      createdAt: model.created_at,
      promptInstruction: model.prompt_instruction,
      lastPromptUpdate: model.last_prompt_update ?? undefined,
      canUpdatePrompt,
    });

    return project;
  }
}
