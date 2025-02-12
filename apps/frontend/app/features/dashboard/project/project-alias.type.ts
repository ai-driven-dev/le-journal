import type { ProjectType } from '@le-journal/shared-types';

import type { Actionable, Statable } from '~/interfaces/component.interface';

export interface ProjectState extends Statable<ProjectType> {
  state: ProjectType | null;
}

export interface ProjectActions extends Actionable<ProjectType> {
  init: (project: ProjectType) => void;
}

export interface ProjectStore extends ProjectState, ProjectActions {}
