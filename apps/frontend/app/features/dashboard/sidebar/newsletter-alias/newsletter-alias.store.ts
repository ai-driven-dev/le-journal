import { makeAutoObservable } from 'mobx';
import type { IProject } from '@le-journal/shared-types';

import { NEWSLETTER_ALIAS_MOCK } from './newsletter-alias.mock';
import type { INewsletterAliasActions, INewsletterAliasState } from './newsletter-alias.type';

class NewsletterAliasStore implements INewsletterAliasState, INewsletterAliasActions {
  currentProject: IProject | null = NEWSLETTER_ALIAS_MOCK;

  constructor() {
    makeAutoObservable(this);
  }

  copyToClipboard = async (): Promise<void> => {
    try {
      if (!this.currentProject) {
        throw new Error('No project selected');
      }
      await navigator.clipboard.writeText(this.currentProject.newsletterAlias);
      // TODO: Ajouter une notification de succès
    } catch (error) {
      console.error('Erreur lors de la copie :', error);
      // TODO: Ajouter une notification d'erreur
    }
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createNewsletterAliasStore = () => new NewsletterAliasStore();
