import type { Project } from '@le-journal/shared-types';

export interface NewsletterAliasState {
  currentProject: Project | null;
}

export interface NewsletterAliasActions {
  copyToClipboard: () => void;
}
