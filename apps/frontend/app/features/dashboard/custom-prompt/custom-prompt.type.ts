import type { ProjectPromptType } from '@le-journal/shared-types';

import type { Actionable, Statable } from '~/interfaces/component.interface';

export interface CustomPromptState extends Statable<ProjectPromptType> {
  isDialogOpen: boolean;
}

export interface CustomPromptActions extends Actionable<ProjectPromptType> {
  setIsDialogOpen: (isOpen: boolean) => void;
}

export interface CustomPromptStore extends CustomPromptState, CustomPromptActions {}
