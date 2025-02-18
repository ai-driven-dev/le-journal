import { Project } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';
import { Project as PrismaProject } from '@prisma/client';

import { ProjectDomain } from '../domain/project';

import { Mapper } from 'src/presentation/mapper.interface';

@Injectable()
export class ProjectMapper implements Mapper<ProjectDomain, PrismaProject> {
  toModel(domain: ProjectDomain): PrismaProject {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      newsletter_alias: domain.newsletterAlias,
      project_number: domain.projectNumber,
      created_at: domain.createdAt,
      prompt_instruction: domain.promptInstruction,
      last_prompt_update: domain.lastPromptUpdate ? new Date(domain.lastPromptUpdate) : null,
      user_id: domain.userId,
    };
  }

  toDomain(model: PrismaProject, canUpdatePrompt: boolean): ProjectDomain {
    return new ProjectDomain({
      id: model.id,
      name: model.name,
      slug: model.slug,
      newsletterAlias: model.newsletter_alias,
      projectNumber: model.project_number,
      createdAt: new Date(model.created_at),
      promptInstruction: model.prompt_instruction,
      lastPromptUpdate: model.last_prompt_update ? new Date(model.last_prompt_update) : undefined,
      canUpdatePrompt,
      userId: model.user_id,
    });
  }

  toDTO(domain: ProjectDomain): Project {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      newsletterAlias: domain.newsletterAlias,
      projectNumber: domain.projectNumber,
      createdAt: domain.createdAt.toISOString(),
      promptInstruction: domain.promptInstruction,
      lastPromptUpdate: domain.lastPromptUpdate?.toISOString(),
      canUpdatePrompt: domain.canUpdatePrompt,
    };
  }

  fromDTO(dto: Project): ProjectDomain {
    return new ProjectDomain({
      id: dto.id,
      name: dto.name,
      slug: dto.slug,
      newsletterAlias: dto.newsletterAlias,
      projectNumber: dto.projectNumber,
      createdAt: new Date(dto.createdAt),
      promptInstruction: dto.promptInstruction,
      lastPromptUpdate: dto.lastPromptUpdate ? new Date(dto.lastPromptUpdate) : undefined,
      canUpdatePrompt: dto.canUpdatePrompt,
      userId: '', // This should be set by the use case
    });
  }
}
