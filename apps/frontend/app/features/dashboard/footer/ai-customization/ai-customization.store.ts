import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { IAiCustomizationState } from './ai-customization.type';

export class AiCustomizationStore implements IAiCustomizationState {
  customization = '';
  isDialogOpen = false;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setCustomization = (value: string) => {
    this.customization = value;
  };

  setIsDialogOpen = (isOpen: boolean) => {
    this.isDialogOpen = isOpen;
  };

  handleSave = () => {
    // Here you would typically send the customization to your backend
    console.log('Saving customization:', this.customization);
    this.setIsDialogOpen(false);
  };
}
