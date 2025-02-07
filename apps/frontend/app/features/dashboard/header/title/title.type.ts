export interface ITitleState {
  isLogoutDialogOpen: boolean;
  pendingNewslettersCount: number;
}

export interface ITitleActions {
  setIsLogoutDialogOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}
