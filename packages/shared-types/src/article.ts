/**
 * Article-related types shared between frontend and backend
 */
export interface Article {
  subject: string;
  description: string;
  score: number;
  link: string | null;
}
