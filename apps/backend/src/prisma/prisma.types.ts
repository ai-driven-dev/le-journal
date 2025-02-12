import type {
  Prisma,
  Article as PrismaArticle,
  Email as PrismaEmail,
  Newsletter as PrismaNewsletter,
  Project as PrismaProject,
  User as PrismaUser,
} from '@prisma/client';

export type PrismaEmailWithArticles = Prisma.EmailGetPayload<{
  include: { articles: true };
}>;

type EmailWithArticles = Prisma.EmailGetPayload<{
  include: { articles: true };
}>;

export type UserModel = Omit<PrismaUser, 'google_id'>;
export type ProjectModel = Omit<PrismaProject, 'user_id'>;
export type EmailModel = Omit<PrismaEmail, 'newsletter_id' | 'project_id'>;
export type NewsletterModel = Omit<PrismaNewsletter, 'project_id' | 'user_id'>;
export type ArticleModel = Omit<PrismaArticle, 'email_id'>;
