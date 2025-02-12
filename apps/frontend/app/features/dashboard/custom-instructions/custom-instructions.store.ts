import type { ProjectPromptType } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import type { CustomInstructions } from './custom-instructions.type';

import type { Loadable } from '~/interfaces/loadable.interface';
import { clientFetch } from '~/lib/api-fetcher.client';
import { verify } from '~/lib/validator';

export class CustomInstructionsStore implements CustomInstructions, Loadable<ProjectPromptType> {
  state: ProjectPromptType | null = null;
  isDialogOpen = false;
  isLoading = true;
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = (prompt: ProjectPromptType): void => {
    verify(prompt);

    runInAction(() => {
      this.state = prompt;
      this.isLoading = false;
    });
  };

  save = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const updatedState = await clientFetch<ProjectPromptType>(event, this.state);

    this.init(updatedState);
  };

  changeInstruction = (instruction: string): void => {
    if (this.state === null) {
      throw new Error('State is null');
    }

    this.state.promptInstruction = instruction;
  };

  setIsDialogOpen = (isOpen: boolean): void => {
    this.isDialogOpen = isOpen;
  };
}
