import { makeAutoObservable, runInAction } from 'mobx';

import type {
  CustomPromptActions,
  CustomPromptState,
  PromptInstruction,
} from './custom-prompt.type';

export class CustomPromptStore implements CustomPromptState, CustomPromptActions {
  id = '';
  prompt = '';
  isDialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  get currentPrompt(): PromptInstruction {
    return {
      id: this.id,
      prompt: this.prompt,
    };
  }

  initializePrompt = (prompt: PromptInstruction): void => {
    runInAction(() => {
      this.id = prompt.id;
      this.prompt = prompt.prompt;
    });
  };

  setIsDialogOpen = (isOpen: boolean): void => {
    this.isDialogOpen = isOpen;
  };
}

export const createCustomPromptStore = (): CustomPromptStore => new CustomPromptStore();
