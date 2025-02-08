/**
 * Newsletter-related types shared between frontend and backend
 */
export interface Newsletter {
  id: string;
  user_id: string;
  subscribed_at: Date;
}
