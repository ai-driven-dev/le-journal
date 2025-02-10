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

  loadNewsletters = (newsletters: Newsletter[]): void => {
    this.newsletters = newsletters;
  };
}

export const createNewsletterSubscriptionsStore = (): NewsletterSubscriptionsStore => {
  return new NewsletterSubscriptionsStore();
};
