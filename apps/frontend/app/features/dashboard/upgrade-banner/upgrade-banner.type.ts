export interface UpgradeBannerState {
  isVisible: boolean;
}

export interface UpgradeBannerActions {
  setIsVisible: (isVisible: boolean) => void;
  handleUpgrade: () => void;
}
