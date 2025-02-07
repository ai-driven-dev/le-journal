import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { IUpgradeBannerState } from './upgrade-banner.type';

export class UpgradeBannerStore implements IUpgradeBannerState {
  isVisible = true;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setIsVisible = (isVisible: boolean) => {
    this.isVisible = isVisible;
  };

  handleUpgradeClick = () => {
    // Implement upgrade logic here
    console.log('Upgrading...');
  };
}
