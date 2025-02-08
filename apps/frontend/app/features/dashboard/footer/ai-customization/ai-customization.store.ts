import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { IAiCustomizationActions, IAiCustomizationState } from './ai-customization.type';

export class AiCustomizationStore implements IAiCustomizationState, IAiCustomizationActions {
  customization = '';
  isDialogOpen = false;

  constructor(private readonly dashboardStore: DashboardStore) {
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
