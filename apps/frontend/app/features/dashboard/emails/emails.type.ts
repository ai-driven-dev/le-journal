import type { Email } from '@le-journal/shared-types';

import type { Loadable } from '~/interfaces/loadable.interface';

export interface EmailState {
  selectedEmailId: string | null;
  isDrawerOpen: boolean;
  loadEmails: (emails: Email[]) => void;
  selectEmail: (id: string | null) => void;
  toggleEmailDetails: (isOpen: boolean) => void;
  showEmailDetails: (e: React.MouseEvent) => void;
}

export interface EmailActions {
  selectEmail: (id: string | null) => void;
  toggleEmailDetails: (isOpen: boolean) => void;
  showEmailDetails: (e: React.MouseEvent) => void;
}

export interface EmailStore extends Loadable<Email[]>, EmailState, EmailActions {}
