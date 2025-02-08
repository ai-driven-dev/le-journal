import type { IProject } from '@le-journal/shared-types';

export interface INewsletterAliasState {
  currentProject: IProject | null;
}

export interface INewsletterAliasActions {
  copyToClipboard: () => void;
}
