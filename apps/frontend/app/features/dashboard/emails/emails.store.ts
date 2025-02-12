import type { Email } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { ProjectStore } from '../project/project-alias.store';

import type { EmailActions, EmailState } from './emails.type';

import type { Loadable } from '~/interfaces/loadable.interface';

export class EmailStore implements EmailState, EmailActions, Loadable<Email[]> {
  state: Email[] | null = null;
  isLoading = true;
  isSubmitting = false;
  selectedEmailId: string | null = null;
  isDrawerOpen = false;

  constructor(private readonly projectStore: ProjectStore) {
    makeAutoObservable(this);
  }

  loadEmails = (emails: Email[]): void => {
    this.state = emails;
    this.isLoading = false;
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

export const createEmailStore = (projectStore: ProjectStore): EmailStore =>
  new EmailStore(projectStore);
