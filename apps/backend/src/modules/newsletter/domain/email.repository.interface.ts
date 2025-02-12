import type { EmailModel } from '../../../prisma/prisma.types';

export const EMAIL_REPOSITORY = 'EMAIL_REPOSITORY';

export interface EmailRepository {
  findAllByProjectId(projectId: string): Promise<EmailModel[]>;
}
