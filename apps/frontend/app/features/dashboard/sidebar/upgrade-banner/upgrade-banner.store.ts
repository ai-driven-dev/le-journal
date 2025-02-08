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
    console.log('Handling upgrade...');
    this.setIsVisible(false);
  };
}

export const createUpgradeBannerStore = () => new UpgradeBannerStore();
