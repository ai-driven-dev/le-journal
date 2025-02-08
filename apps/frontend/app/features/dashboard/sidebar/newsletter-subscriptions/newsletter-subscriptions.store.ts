import { makeAutoObservable } from 'mobx';

import { mockNewsletterSubscriptionsState } from './newsletter-subscriptions.mock';
import type { NewsletterSubscriptionsState } from './newsletter-subscriptions.type';

export class NewsletterSubscriptionsStore implements NewsletterSubscriptionsState {
  newsletters = mockNewsletterSubscriptionsState.newsletters;

  constructor() {
    makeAutoObservable(this);
  }

  setIsHoverCardOpen = (isOpen: boolean): void => {
    // This method is kept for compatibility but might not be needed anymore
    console.warn('setIsHoverCardOpen is deprecated');
  };
}

export const createNewsletterSubscriptionsStore = (): NewsletterSubscriptionsStore =>
  new NewsletterSubscriptionsStore();
