import type { Article } from './article';

export interface Email {
  id: string;
  project_id: string;
  newsletter_id: string;
  subject: string;
  raw_content: string;
  received_at: Date;
  status: 'RECEIVED' | 'PROCESSED' | 'FAILED';
  articles: Article[];
}
