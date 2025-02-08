import { Check, Clock, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { createNewsletterSubscriptionsStore } from './newsletter-subscriptions.store';
import type { NewsletterWithStatus } from './newsletter-subscriptions.type';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';

const iconComponents = {
  Check,
  Clock,
  X,
};

const statusDescriptions = {
  validated: 'Cette adresse email a été validée et recevra les prochaines newsletters.',
  pending: 'En attente de confirmation. Un email de validation a été envoyé.',
  blocked: 'Cette adresse email a été bloquée suite à des erreurs ou une désinscription.',
};

const NewsletterSubscriptions = observer(() => {
  const store = createNewsletterSubscriptionsStore();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Newsletter Subscriptions</h3>
      <ul className="space-y-2">
        {store.newsletters.map((newsletter: NewsletterWithStatus) => {
          const IconComponent = iconComponents[newsletter.status.icon];
          return (
            <HoverCard key={newsletter.id}>
              <HoverCardTrigger asChild>
                <li className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md cursor-help">
                  <span className="text-sm font-mono">{newsletter.email}</span>
                  <IconComponent className={newsletter.status.colorClass} size={18} />
                </li>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Statut : {newsletter.status.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {statusDescriptions[newsletter.status.type]}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </ul>
    </div>
  );
});

NewsletterSubscriptions.displayName = 'NewsletterSubscriptions';

export default NewsletterSubscriptions;
