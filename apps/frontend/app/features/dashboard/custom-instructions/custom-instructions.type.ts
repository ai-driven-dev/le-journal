import type { ProjectPromptInstructions } from '@le-journal/shared-types';

import type { Loadable } from '~/interfaces/loadable.interface';

interface CustomInstructionsState {
  isDialogOpen: boolean;
}

interface CustomInstructionsActions {
  openDialog: () => void;
  closeDialog: () => void;
}

export interface CustomInstructions
  extends CustomInstructionsState,
    CustomInstructionsActions,
    Loadable<ProjectPromptInstructions> {}
