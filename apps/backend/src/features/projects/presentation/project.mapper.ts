import { Injectable } from '@nestjs/common';
import { Project as ProjectModel } from '@prisma/client';

import { Project } from '../domain/project';

@Injectable()
export class ProjectMapper {
  toModel(dto: Project): ProjectModel {
    return {
      id: dto.id,
      name: dto.name,
      slug: dto.slug,
      newsletter_alias: dto.newsletterAlias,
      project_number: dto.projectNumber,
      created_at: dto.createdAt,
      prompt_instruction: dto.promptInstruction,
      user_id: dto.userId,
    };
  }

  toDto(model: ProjectModel): Project {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      newsletterAlias: model.newsletter_alias,
      projectNumber: model.project_number,
      createdAt: model.created_at,
      promptInstruction: model.prompt_instruction,
      userId: model.user_id,
    };
  }
}
