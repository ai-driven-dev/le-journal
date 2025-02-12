import type { ProjectPromptType } from '@le-journal/shared-types';

import type { Actionable, Statable } from '~/interfaces/component.interface';

export interface CustomInstructionsState extends Statable<ProjectPromptType> {
  isDialogOpen: boolean;
}

export interface CustomInstructionsActions extends Actionable<ProjectPromptType> {
  setIsDialogOpen: (isOpen: boolean) => void;
}

export interface CustomInstructions extends CustomInstructionsState, CustomInstructionsActions {}
