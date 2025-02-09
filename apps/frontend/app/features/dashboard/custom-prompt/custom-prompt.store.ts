import { makeAutoObservable } from 'mobx';

import type { CustomPromptActions, CustomPromptState } from './custom-prompt.type';

export class CustomPromptStore implements CustomPromptState, CustomPromptActions {
  customization = '';
  isDialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCustomization = (value: string): void => {
    this.customization = value;
  };

  setIsDialogOpen = (isOpen: boolean): void => {
    this.isDialogOpen = isOpen;
  };

  handleSave = (): void => {
    // TODO: Here you would typically send the customization to your backend
    this.setIsDialogOpen(false);
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createCustomPromptStore = () => new CustomPromptStore();
