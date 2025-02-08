import type {
  NewsletterSubscriptionsState,
  NewsletterWithStatus,
} from './newsletter-subscriptions.type';

const statusConfig = {
  validated: {
    type: 'validated' as const,
    icon: 'Check' as const,
    colorClass: 'text-green-500',
  },
  pending: {
    type: 'pending' as const,
    icon: 'Clock' as const,
    colorClass: 'text-yellow-500',
  },
  blocked: {
    type: 'blocked' as const,
    icon: 'X' as const,
    colorClass: 'text-gray-400',
  },
};

export const mockNewsletters: NewsletterWithStatus[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    status: statusConfig.validated,
  },
  {
    id: '2',
    email: 'marie.dupont@gmail.com',
    status: statusConfig.pending,
  },
  {
    id: '3',
    email: 'contact@invalid-domain.com',
    status: statusConfig.blocked,
  },
];

export const mockNewsletterSubscriptionsState: NewsletterSubscriptionsState = {
  newsletters: mockNewsletters,
};
