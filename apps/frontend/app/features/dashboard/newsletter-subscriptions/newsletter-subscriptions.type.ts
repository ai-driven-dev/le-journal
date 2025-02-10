import type { Newsletter } from '@le-journal/shared-types';
import type { LucideIcon } from 'lucide-react';

export interface NewsletterStatusDisplay {
  icon: LucideIcon;
  description: string;
  color: 'success' | 'warning' | 'error' | 'info';
}

export interface NewsletterSubscriptionsState {
  newsletters: Newsletter[];
}

export interface NewsletterSubscriptionsActions {
  loadNewsletters: (newsletters: Newsletter[]) => void;
}
