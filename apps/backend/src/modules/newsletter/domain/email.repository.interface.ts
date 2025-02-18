import type { EmailDomain } from './email.domain';

export const EMAIL_REPOSITORY = 'EMAIL_REPOSITORY';

export interface EmailRepository {
  findAllByProjectId(projectId: string): Promise<EmailDomain[]>;
}
