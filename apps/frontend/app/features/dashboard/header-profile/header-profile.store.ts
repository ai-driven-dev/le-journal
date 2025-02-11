import type { User } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { TitleActions, TitleState } from './header-profile.type';

import { authStore } from '~/features/auth/stores/auth.store';

class HeaderProfileStore implements TitleState, TitleActions {
  user: User | null = null;
  isLogoutDialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadUserInfo = (user: User): void => {
    this.user = user;
  };

  setIsLogoutDialogOpen = (isOpen: boolean): void => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = async (): Promise<void> => {
    await authStore.logout();
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createHeaderProfileStore = () => new HeaderProfileStore();
