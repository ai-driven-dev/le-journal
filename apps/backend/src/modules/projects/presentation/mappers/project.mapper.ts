import { Project } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

import { ProjectDomain } from '../../domain/project';

import { Mapper } from 'src/presentation/mapper.interface';
import { ProjectModel } from 'src/prisma/prisma.types';

@Injectable()
export class ProjectMapper implements Mapper<ProjectDomain, ProjectModel> {
  toModel(domain: ProjectDomain): ProjectModel {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      email_alias: domain.emailAlias,
      project_number: domain.projectNumber,
      created_at: domain.createdAt,
      prompt_instruction: domain.promptInstruction,
      last_prompt_update: domain.lastPromptUpdate ? new Date(domain.lastPromptUpdate) : null,
      google_label_name: domain.googleLabelName,
    };
  }

  toDomain(model: ProjectModel, canUpdatePrompt: boolean): ProjectDomain {
    return new ProjectDomain({
      id: model.id,
      name: model.name,
      slug: model.slug,
      emailAlias: model.email_alias,
      projectNumber: model.project_number,
      createdAt: new Date(model.created_at),
      promptInstruction: model.prompt_instruction,
      lastPromptUpdate: model.last_prompt_update ? new Date(model.last_prompt_update) : undefined,
      canUpdatePrompt,
      googleLabelName: model.google_label_name,
    });
  }

  toDTO(domain: ProjectDomain): Project {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      emailAlias: domain.emailAlias,
      projectNumber: domain.projectNumber,
      createdAt: domain.createdAt.toISOString(),
      promptInstruction: domain.promptInstruction,
      lastPromptUpdate: domain.lastPromptUpdate?.toISOString(),
      canUpdatePrompt: domain.canUpdatePrompt,
      googleLabelName: domain.googleLabelName,
    };
  }

  fromDTO(dto: Project): ProjectDomain {
    return new ProjectDomain({
      id: dto.id,
      name: dto.name,
      slug: dto.slug,
      emailAlias: dto.emailAlias,
      projectNumber: dto.projectNumber,
      createdAt: new Date(dto.createdAt),
      promptInstruction: dto.promptInstruction,
      lastPromptUpdate: dto.lastPromptUpdate ? new Date(dto.lastPromptUpdate) : undefined,
      canUpdatePrompt: dto.canUpdatePrompt,
      googleLabelName: dto.googleLabelName,
    });
  }
}
