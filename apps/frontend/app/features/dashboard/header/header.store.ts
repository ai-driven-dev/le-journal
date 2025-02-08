import { makeAutoObservable } from 'mobx';

import type { NewsletterTableStore } from '../main/newsletter-table/newsletter-table.store';

import type { ITitleActions, ITitleState } from './header.type';

class HeaderStore implements ITitleState, ITitleActions {
  isLogoutDialogOpen = false;

  newsletterStore: NewsletterTableStore; // Dépendance injectée

  constructor(newsletterStore: NewsletterTableStore) {
    this.newsletterStore = newsletterStore;
    makeAutoObservable(this);
  }

  get pendingNewslettersCount(): number {
    return this.newsletterStore.newsletters.length;
  }

  setIsLogoutDialogOpen = (isOpen: boolean): void => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = (): void => {
    // Implement logout logic here
    console.log('Logging out...');
  };
}

export const createHeaderStore = (newsletterStore: NewsletterTableStore) =>
  new HeaderStore(newsletterStore);
