import type { User } from '@le-journal/shared-types';

import type { Loadable } from '~/interfaces/loadable.interface';

export interface HeaderProfileState {
  isLogoutDialogOpen: boolean;
}

export interface HeaderProfileActions {
  setIsLogoutDialogOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

export interface HeaderProfile extends HeaderProfileState, HeaderProfileActions, Loadable<User> {}
