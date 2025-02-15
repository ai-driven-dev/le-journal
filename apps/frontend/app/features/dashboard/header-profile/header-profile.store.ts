import type { User } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { TitleActions, TitleState } from './header-profile.type';

import type { AuthStore } from '~/features/auth/auth.store';

export class HeaderProfileStore implements TitleState, TitleActions {
  user: User | null = null;
  isLogoutDialogOpen = false;

  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
  }

  loadUserInfo = (user: User): void => {
    this.user = user;
  };

  setIsLogoutDialogOpen = (isOpen: boolean): void => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = async (): Promise<void> => {
    await this.authStore.logout();
  };
}

