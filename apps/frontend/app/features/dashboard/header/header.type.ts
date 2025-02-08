export interface TitleState {
  isLogoutDialogOpen: boolean;
}

export interface TitleActions {
  setIsLogoutDialogOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}
