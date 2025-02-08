import { makeAutoObservable } from 'mobx';

import { mockDashboardState } from './dashboard.mock';
import type { DashboardState } from './dashboard.type';
import { createAiCustomizationStore } from './footer/ai-customization/ai-customization.store';
import { createHeaderStore } from './header/header.store';
import { createNewsletterTableStore } from './main/newsletter-table/newsletter-table.store';
import { createNewsletterAliasStore } from './sidebar/newsletter-alias/newsletter-alias.store';
import { createNewsletterSubscriptionsStore } from './sidebar/newsletter-subscriptions/newsletter-subscriptions.store';
import { createUpgradeBannerStore } from './sidebar/upgrade-banner/upgrade-banner.store';

export class DashboardStore implements DashboardState {
  // User data from DashboardState
  readonly userName = mockDashboardState.userName;
  readonly lastVisit = mockDashboardState.lastVisit;

  // Child stores
  readonly aiCustomization = createAiCustomizationStore();
  readonly newsletterTable = createNewsletterTableStore();
  readonly newsletterSubscriptions = createNewsletterSubscriptionsStore();
  readonly upgradeBanner = createUpgradeBannerStore();
  readonly header = createHeaderStore();
  readonly newsletterAlias = createNewsletterAliasStore();

  constructor() {
    makeAutoObservable(this);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createDashboardStore = () => new DashboardStore();
