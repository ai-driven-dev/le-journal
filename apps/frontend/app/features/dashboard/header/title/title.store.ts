import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { ITitleActions, ITitleState } from './title.type';

export class TitleStore implements ITitleState, ITitleActions {
  isLogoutDialogOpen = false;
  pendingNewslettersCount = 2;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setIsLogoutDialogOpen = (isOpen: boolean): void => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = (): void => {
    // Implement your logout logic here
    console.log('Logging out...');
    this.setIsLogoutDialogOpen(false);
  };
}
