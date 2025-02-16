import type { Newsletter } from '@le-journal/shared-types';
import type { LucideIcon } from 'lucide-react';

import type { Loadable } from '~/interfaces/loadable.interface';

export interface NewsletterStatusDisplay {
  icon: LucideIcon;
  description: string;
  color: 'success' | 'warning' | 'error' | 'info';
}

export interface NewsletterSubscriptionsState {}

export interface NewsletterSubscriptionsActions {}

export interface NewsletterSubscriptions
  extends Loadable<Newsletter[]>,
    NewsletterSubscriptionsState,
    NewsletterSubscriptionsActions {}
