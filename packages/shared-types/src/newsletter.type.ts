/**
 * Newsletter-related types shared between frontend and backend
 */

export type SubscriptionStatus = 'ACTIVE' | 'IN_PROGRESS' | 'PENDING' | 'FAILED';

export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE' as const,
  IN_PROGRESS: 'IN_PROGRESS' as const,
  PENDING: 'PENDING' as const,
  FAILED: 'FAILED' as const,
} as const;

export interface Newsletter {
  id: string;
  user_id: string;
  email: string;
  subscribed_at: Date;
  subscription_status: SubscriptionStatus;
}
