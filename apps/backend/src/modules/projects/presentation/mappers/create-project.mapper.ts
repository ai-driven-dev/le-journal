import { ProjectCreateDTO } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

import { ProjectCreateDomain } from '../../domain/project-create';

import { ProjectCreateModel } from 'src/prisma/prisma.types';

@Injectable()
export class CreateProjectMapper {
  toDTO(domain: ProjectCreateDomain): ProjectCreateDTO {
    return {
      name: domain.name,
      slug: domain.slug,
      emailAlias: domain.emailAlias,
      projectNumber: domain.projectNumber,
      userId: domain.userId,
    };
  }

  toDomain(dto: ProjectCreateDTO): ProjectCreateDomain {
    return new ProjectCreateDomain({
      name: dto.name,
      slug: dto.slug,
      emailAlias: dto.emailAlias,
      projectNumber: dto.projectNumber,
      userId: dto.userId,
    });
  }

  toModel(domain: ProjectCreateDomain): ProjectCreateModel {
    return {
      name: domain.name,
      slug: domain.slug,
      email_alias: domain.emailAlias,
      project_number: domain.projectNumber,
      created_at: new Date(),
      prompt_instruction: '',
      last_prompt_update: null,
      google_label_name: '',
      google_label_id: '',
    };
  }
}
