import type { Project } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { ProjectAlias } from './project-alias.type';

export class ProjectAliasStore implements ProjectAlias {
  state: Project | null = null;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  load(project: Project): void {
    this.state = project;
  }

  copyToClipboard = async (): Promise<void> => {
    try {
      if (this.state === null) {
        throw new Error('No project selected');
      }
      await navigator.clipboard.writeText(this.state.newsletterAlias);
      // TODO: Ajouter une notification de succès
    } catch (error) {
      console.error('Erreur lors de la copie :', error);
      // TODO: Ajouter une notification d'erreur
    }
  };
}

