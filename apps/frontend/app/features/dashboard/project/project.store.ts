import type { Project } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { ProjectActions, ProjectState } from './project.type';

export class ProjectStore implements ProjectActions, ProjectState {
  currentProject: Project | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentProject(project: Project): void {
    this.currentProject = project;
  }

  copyToClipboard = async (): Promise<void> => {
    try {
      if (this.currentProject === null) {
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

export const createProjectStore = (): ProjectStore => new ProjectStore();
