import type { Article } from './article';

/**
 * Newsletter-related types shared between frontend and backend
 */
export interface Newsletter {
  id: number;
  title: string;
  date: string;
  subject: string;
  status: 'completed' | 'processing' | 'failed';
  articles: Article[];
}
