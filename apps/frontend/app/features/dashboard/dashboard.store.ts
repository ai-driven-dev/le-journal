import { makeAutoObservable } from 'mobx';

import { mockDashboardState } from './dashboard.mock';
import type { DashboardState } from './dashboard.type';
import { createAiCustomizationStore } from './footer/ai-customization/ai-customization.store';
import { createHeaderStore } from './header/header.store';
import { createNewsletterTableStore } from './main/newsletter-table/newsletter-table.store';
import { createStatusListStore } from './sidebar/status-list/status-list.store';
import { createUpgradeBannerStore } from './sidebar/upgrade-banner/upgrade-banner.store';

export class DashboardStore implements DashboardState {
  // User data from DashboardState
  readonly userName = mockDashboardState.userName;
  readonly lastVisit = mockDashboardState.lastVisit;

  // Child stores
  readonly aiCustomization = createAiCustomizationStore();
  readonly newsletterTable = createNewsletterTableStore();
  readonly statusList = createStatusListStore();
  readonly upgradeBanner = createUpgradeBannerStore();
  readonly header = createHeaderStore(this.newsletterTable);

  constructor() {
    makeAutoObservable(this);
  }
}

export const createDashboardStore = () => new DashboardStore();
