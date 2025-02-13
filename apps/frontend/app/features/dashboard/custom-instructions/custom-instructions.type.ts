import type { ProjectPromptInstructions } from '@le-journal/shared-types';

import type { Actionable, Statable } from '~/interfaces/component.interface';
import type { Loadable } from '~/interfaces/loadable.interface';

interface CustomInstructionsState extends Statable<ProjectPromptInstructions> {
  isDialogOpen: boolean;
}

interface CustomInstructionsActions extends Actionable<ProjectPromptInstructions> {
  openDialog: () => void;
  closeDialog: () => void;
}

export interface CustomInstructions
  extends CustomInstructionsState,
    CustomInstructionsActions,
    Loadable<ProjectPromptInstructions> {}
