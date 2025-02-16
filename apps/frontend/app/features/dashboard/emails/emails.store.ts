import type { Email } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { EmailStore } from './emails.type';

import { verify } from '~/lib/validator';

export class EmailsStore implements EmailStore {
  state: Email[] = [];
  isLoading = true;

  selectedEmailId: string | null = null;
  isDrawerOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  load = (emails: Email[]): void => {
    emails.forEach((email) => {
      verify(email);
    });

    this.state = emails;
    this.isLoading = false;
  };

  get defaultEmailId(): string {
    return this.state[0]?.id ?? '';
  }

  selectEmail = (id: string | null): void => {
    this.selectedEmailId = id;
  };

  toggleEmailDetails = (isOpen: boolean): void => {
    this.isDrawerOpen = isOpen;
  };

  showEmailDetails = (e: React.MouseEvent): void => {
    e.stopPropagation();
    this.toggleEmailDetails(true);
  };
}
