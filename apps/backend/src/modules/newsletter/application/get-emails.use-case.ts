import { Inject, Injectable } from '@nestjs/common';

import { EmailDomain } from '../domain/email.domain';
import { EMAIL_REPOSITORY, EmailRepository } from '../domain/email.repository.interface';

@Injectable()
export class GetEmailsUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(projectId: string): Promise<EmailDomain[]> {
    return this.emailRepository.findAllByProjectId(projectId);
  }
}
