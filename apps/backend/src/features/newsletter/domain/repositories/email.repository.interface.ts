import type { Prisma } from '@prisma/client';

export const EMAIL_REPOSITORY = 'EMAIL_REPOSITORY';

export type EmailWithArticles = Prisma.EmailGetPayload<{
  include: { articles: true };
}>;

export interface EmailRepository {
  searchByUserIdAndTerm(userId: string, searchTerm: string): Promise<EmailWithArticles[]>;
  findByProjectId(projectId: string): Promise<EmailWithArticles[]>;
}
