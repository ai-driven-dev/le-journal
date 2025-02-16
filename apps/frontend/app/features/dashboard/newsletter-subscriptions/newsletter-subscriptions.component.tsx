import type { NewsletterStatusType } from '@le-journal/shared-types';
import { Check, Clock, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import type { NewsletterStatusDisplay } from './newsletter-subscriptions.type';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { useGlobalStore } from '~/stores/root.provider';

const NEWSLETTER_STATUS_DISPLAY: Record<NewsletterStatusType, NewsletterStatusDisplay> = {
  ACTIVE: {
    icon: Check,
    description: 'La souscription est active et fonctionne correctement',
    color: 'success',
  },
  IN_PROGRESS: {
    icon: Clock,
    description: 'La souscription est en cours de traitement',
    color: 'info',
  },
  PENDING: {
    icon: Clock,
    description: 'La souscription est en attente de validation',
    color: 'warning',
  },
  FAILED: {
    icon: X,
    description: 'La souscription a échoué ou a été annulée',
    color: 'error',
  },
} as const;

export const NewsletterSubscriptions: FC = observer(() => {
  const { dashboardStore } = useGlobalStore();
  const store = dashboardStore.newslettersStore;

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (store.state.length === 0) {
    return <div>No newsletters found</div>;
  }

  return (
    <div className="space-y-4">
      {store.state.map((newsletter) => {
        const statusDisplay = NEWSLETTER_STATUS_DISPLAY[newsletter.subscriptionStatus];

        return (
          <div
            key={newsletter.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium">{newsletter.email}</div>
            </div>

            <HoverCard>
              <HoverCardTrigger>
                <div className={`text-${statusDisplay.color}`}>
                  <statusDisplay.icon className="h-5 w-5" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">{statusDisplay.description}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        );
      })}
    </div>
  );
});

NewsletterSubscriptions.displayName = 'NewsletterSubscriptionsComponent';
