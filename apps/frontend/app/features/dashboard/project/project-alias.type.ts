import type { Project } from '@le-journal/shared-types';

import type { Loadable } from '~/interfaces/loadable.interface';

export interface ProjectState {}

export interface ProjectActions {}

export interface ProjectAlias extends Loadable<Project>, ProjectState, ProjectActions {}
