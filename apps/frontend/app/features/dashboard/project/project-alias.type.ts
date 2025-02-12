import type { Project } from '@le-journal/shared-types';

import type { Actionable, Statable } from '~/interfaces/component.interface';

export interface ProjectState extends Statable<Project> {
  state: Project | null;
}

export interface ProjectActions extends Actionable<Project> {
  init: (project: Project) => void;
}

export interface ProjectStore extends ProjectState, ProjectActions {}
