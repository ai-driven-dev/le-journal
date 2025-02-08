export interface ITitleState {
  isLogoutDialogOpen: boolean;
}

export interface ITitleActions {
  setIsLogoutDialogOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}
