import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

import { EmailContent, EmailServiceRepository } from './email.types';

@Injectable()
export class EmailService implements EmailServiceRepository {
  private readonly resend: Resend;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined');
    }
    this.resend = new Resend(apiKey);
  }

  async sendEmail(content: EmailContent): Promise<boolean> {
    try {
      const emailSent = await this.resend.emails.send(content);

      if (emailSent.error) {
        this.logger.error(
          `Failed to send email (${emailSent.error.name}): ${emailSent.error.message}`,
        );
        return false;
      }

      if (emailSent.data) {
        this.logger.log(`Email sent successfully to ${content.to}`);
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error(
        `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      return false;
    }
  }
}
