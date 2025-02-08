import { makeAutoObservable } from 'mobx';

import { mockNewsletters } from './newsletter-table.mock';
import type { NewsletterTableState } from './newsletter-table.type';

export class NewsletterTableStore implements NewsletterTableState {
  newsletters = mockNewsletters;
  selectedNewsletterId: string | null = null;
  isDrawerOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedNewsletterId = (id: string | null): void => {
    this.selectedNewsletterId = id;
  };

  setIsDrawerOpen = (isOpen: boolean): void => {
    this.isDrawerOpen = isOpen;
  };

  handleOpenDrawer = (e: React.MouseEvent): void => {
    e.stopPropagation();
    this.setIsDrawerOpen(true);
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createNewsletterTableStore = () => new NewsletterTableStore();
