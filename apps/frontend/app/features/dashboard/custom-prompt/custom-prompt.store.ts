import type { ProjectPromptType } from '@le-journal/shared-types';
import { validateSync } from 'class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

export class CustomPromptStore implements CustomPromptStore {
  state: ProjectPromptType | null = null;
  isDialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = (prompt: ProjectPromptType): void => {
    const errors = validateSync(prompt);

    if (errors !== undefined && errors.length > 0) {
      console.log('errors', errors);
      throw new Error('Invalid prompt');
    }

    runInAction(() => {
      this.state = prompt;
    });
  };

  setIsDialogOpen = (isOpen: boolean): void => {
    this.isDialogOpen = isOpen;
  };
}

export const createCustomPromptStore = (): CustomPromptStore => new CustomPromptStore();
