import type { ProjectType } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

export class ProjectStore implements ProjectStore {
  state: ProjectType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  init(project: ProjectType): void {
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

export const createProjectStore = (): ProjectStore => new ProjectStore();
