import type { Project } from '@le-journal/shared-types';

export interface ProjectState {
  currentProject: Project | null;
}

export interface ProjectActions {
  setCurrentProject: (project: Project) => void;
}
