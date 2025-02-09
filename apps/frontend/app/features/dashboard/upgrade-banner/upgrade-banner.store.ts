import { makeAutoObservable } from 'mobx';

import type { UpgradeBannerState } from './upgrade-banner.type';

export class UpgradeBannerStore implements UpgradeBannerState {
  isVisible = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsVisible = (isVisible: boolean): void => {
    this.isVisible = isVisible;
  };

  handleUpgrade = (): void => {
    // Here you would typically handle the upgrade process
    this.setIsVisible(false);
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createUpgradeBannerStore = () => new UpgradeBannerStore();
