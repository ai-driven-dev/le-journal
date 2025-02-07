export interface IUpgradeBannerState {
  isVisible: boolean;
}

export interface IUpgradeBannerActions {
  setIsVisible: (isVisible: boolean) => void;
  handleUpgradeClick: () => void;
}
