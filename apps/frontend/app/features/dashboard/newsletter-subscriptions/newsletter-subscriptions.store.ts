import type { Newsletter } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type {
  NewsletterSubscriptionsActions,
  NewsletterSubscriptionsState,
} from './newsletter-subscriptions.type';

export class NewsletterSubscriptionsStore
  implements NewsletterSubscriptionsActions, NewsletterSubscriptionsState
{
  newsletters: Newsletter[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setNewsletters(newsletters: Newsletter[]): void {
    this.newsletters = newsletters;
  }

  loadNewsletters = (newsletters: Newsletter[]): void => {
    this.newsletters = newsletters;
  };

  setIsHoverCardOpen = (): void => {
    // This method is kept for compatibility but might not be needed anymore
    console.warn('setIsHoverCardOpen is deprecated');
  };
}

export const createNewsletterSubscriptionsStore = (): NewsletterSubscriptionsStore => {
  return new NewsletterSubscriptionsStore();
};
