import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { IUpgradeBannerActions, IUpgradeBannerState } from './upgrade-banner.type';

export class UpgradeBannerStore implements IUpgradeBannerState, IUpgradeBannerActions {
  isVisible = true;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setIsVisible = (isVisible: boolean): void => {
    this.isVisible = isVisible;
  };

  handleUpgradeClick = (): void => {
    // Implement upgrade logic here
    console.log('Upgrading...');
  };
}
