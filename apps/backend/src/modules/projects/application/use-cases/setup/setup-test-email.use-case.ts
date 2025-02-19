import { Inject, Injectable, Logger } from '@nestjs/common';

import { EmailService } from '../../../../../infrastructure/email/email.service';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../../domain/project.repository.interface';

@Injectable()
export class SetupTestEmailUseCase {
  constructor(
    private readonly resendService: EmailService,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger,
  ) {}

  async execute(userId: string, projectId: string): Promise<boolean> {
    try {
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

      const emailContent = {
        from: 'Le Journal <no-reply@lejournal.dev>',
        to: project.emailAlias,
        subject: 'Welcome to Le Journal! 🎉',
        html: `
          <h1>Welcome to Le Journal!</h1>
          <p>This is a test email to verify your Gmail filters are working correctly.</p>
          <p>Here are some useful links to get started:</p>
          <ul>
            <li><a href="https://discord.gg/lejournal">Join our Discord community</a></li>
            <li><a href="https://blog.lejournal.dev">Read our Blog</a></li>
            <li><a href="https://linkedin.com/company/lejournal">Follow us on LinkedIn</a></li>
            <li><a href="https://youtube.com/@lejournal">Subscribe to our YouTube channel</a></li>
          </ul>
          <p>Best regards,<br>The Le Journal Team</p>
        `,
      };

      await this.resendService.sendEmail(emailContent);
      this.logger.log(`Test email sent successfully for project ${projectId}`);
      return true;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to send test email for project ${projectId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      return false;
    }
  }
}
