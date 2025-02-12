import type { Email } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';


import type { EmailStore } from './emails.type';

import { verify } from '~/lib/validator';

export class EmailsStore implements EmailStore {
  state: Email[] | null = null;
  isLoading = true;
  isSubmitting = false;
  selectedEmailId: string | null = null;
  isDrawerOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadEmails = (emails: Email[]): void => {
    emails.forEach((email) => {
      verify(email);
    });

    runInAction(() => {
      this.state = emails;
      this.isLoading = false;
    });
  };

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
