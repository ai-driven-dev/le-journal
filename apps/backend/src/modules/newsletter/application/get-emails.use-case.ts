import { Inject, Injectable } from '@nestjs/common';

import { EMAIL_REPOSITORY, EmailRepository } from '../domain/email.repository.interface';

import { EmailModel } from 'src/prisma/prisma.types';

@Injectable()
export class GetEmailsUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(projectId: string): Promise<EmailModel[]> {
    return this.emailRepository.findAllByProjectId(projectId);
  }
}
