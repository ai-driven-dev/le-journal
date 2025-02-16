import type { User } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { HeaderProfile } from './header-profile.type';

import type { AuthStore } from '~/features/auth/auth.store';

export class HeaderProfileStore implements HeaderProfile {
  isLogoutDialogOpen = false;
  isLoading = true;
  state: User | null = null;

  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
  }

  load = (user: User): void => {
    this.state = user;
    this.isLoading = false;
  };

  setIsLogoutDialogOpen = (isOpen: boolean): void => {
    this.isLogoutDialogOpen = isOpen;
  };

  handleLogout = async (): Promise<void> => {
    await this.authStore.logout();
  };
}
