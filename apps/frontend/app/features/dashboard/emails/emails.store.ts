import type { Email } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { ProjectStore } from '../project/project.store';

import type { EmailActions, EmailState } from './emails.type';

import type { LoadableState } from '~/types/loadable';
import { initialLoadableState } from '~/types/loadable';

export class EmailStore implements EmailState, EmailActions, LoadableState<Email[]> {
  isLoading = initialLoadableState.isLoading;
  error = initialLoadableState.error;
  data: Email[] | null = initialLoadableState.data;
  selectedEmailId: string | null = null;
  isDrawerOpen = false;

  constructor(private readonly projectStore: ProjectStore) {
    makeAutoObservable(this);
  }

  loadEmails = (emails: Email[]): void => {
    this.data = emails;
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
