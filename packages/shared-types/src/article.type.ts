/**
 * Article-related types shared between frontend and backend
 */
export interface Article {
  id: string;
  subject: string;
  description: string;
  score: number;
  link: string | null;
}
