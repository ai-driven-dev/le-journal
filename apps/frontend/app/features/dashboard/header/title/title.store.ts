import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { ITitleState } from './title.type';

export class TitleStore implements ITitleState {
  isLogoutDialogOpen = false;
  pendingNewslettersCount = 2;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setIsLogoutDialogOpen = (isOpen: boolean) => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
    this.setIsLogoutDialogOpen(false);
  };
}
