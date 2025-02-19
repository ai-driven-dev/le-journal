import { Inject, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';

import { EmailService } from '../../../../../infrastructure/email/email.service';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../../domain/project.repository.interface';

import { WELCOME_EMAIL } from 'src/infrastructure/email/email.data';
import { EmailContent } from 'src/infrastructure/email/email.types';

@Injectable()
export class SetupTestEmailUseCase {
  constructor(
    private readonly resendService: EmailService,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger,
  ) {}

  async execute(userId: string, projectId: string): Promise<boolean> {
    const projects = await this.projectRepository.findBy([
      { key: 'user_id', value: userId },
      { key: 'id', value: projectId },
    ]);

    if (projects.length === 0) {
      this.logger.error(`No project found for user ${userId} and project ${projectId}`);
      return false;
    }

    const project = projects[0];

    if (project === null) {
      this.logger.error(`Project ${projectId} not found`);
      return false;
    }

    this.logger.log(`Sending test email for project ${projectId} to ${project.emailAlias}`);

    const emailContent: EmailContent = {
      to: project.emailAlias,
      ...WELCOME_EMAIL,
    };

    const isEmailSent = await this.resendService.sendEmail(emailContent);

    if (isEmailSent === false) {
      throw new ServiceUnavailableException('Failed to send test email');
    }

    return isEmailSent;
  }
}
