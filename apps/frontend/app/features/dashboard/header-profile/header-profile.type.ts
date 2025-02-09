import type { User } from '@le-journal/shared-types';

export interface TitleState {
  user: User | null;
  isLogoutDialogOpen: boolean;
}

export interface TitleActions {
  setIsLogoutDialogOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}
