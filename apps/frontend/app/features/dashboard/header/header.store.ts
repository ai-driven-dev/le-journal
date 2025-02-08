import { makeAutoObservable } from 'mobx';

import type { TitleActions, TitleState } from './header.type';

class HeaderStore implements TitleState, TitleActions {
  isLogoutDialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLogoutDialogOpen = (isOpen: boolean): void => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = (): void => {
    // Implement logout logic here
    console.log('Logging out...');
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createHeaderStore = () => new HeaderStore();
