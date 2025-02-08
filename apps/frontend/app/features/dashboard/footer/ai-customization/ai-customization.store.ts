import { makeAutoObservable } from 'mobx';

import { mockAiCustomizationState } from './ai-customization.mock';
import type { AiCustomizationState } from './ai-customization.type';

export class AiCustomizationStore implements AiCustomizationState {
  customization = mockAiCustomizationState.customization;
  isDialogOpen = mockAiCustomizationState.isDialogOpen;

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
    // Here you would typically send the customization to your backend
    console.log('Saving customization:', this.customization);
    this.setIsDialogOpen(false);
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createAiCustomizationStore = () => new AiCustomizationStore();
