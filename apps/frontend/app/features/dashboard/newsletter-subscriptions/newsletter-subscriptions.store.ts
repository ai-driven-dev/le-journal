import type { Newsletter } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { NewsletterSubscriptions } from './newsletter-subscriptions.type';

export class NewsletterSubscriptionsStore implements NewsletterSubscriptions {
  state: Newsletter[] = [];
  isLoading = true;
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  load = (newsletters: Newsletter[]): void => {
    this.state = newsletters;
    this.isLoading = false;
  };
}
