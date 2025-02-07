import { makeAutoObservable } from 'mobx';

import { AiCustomizationStore } from '../footer/ai-customization/ai-customization.store';
import { TitleStore } from '../header/title/title.store';
import { NewsletterTableStore } from '../main/newsletter-table/newsletter-table.store';
import { StatusListStore } from '../sidebar/status-list/status-list.store';
import { UpgradeBannerStore } from '../sidebar/upgrade-banner/upgrade-banner.store';

export class DashboardStore {
  public readonly aiCustomization: AiCustomizationStore;
  public readonly newsletterTable: NewsletterTableStore;
  public readonly statusList: StatusListStore;
  public readonly title: TitleStore;
  public readonly upgradeBanner: UpgradeBannerStore;

  constructor() {
    makeAutoObservable(this);

    this.aiCustomization = new AiCustomizationStore(this);
    this.newsletterTable = new NewsletterTableStore(this);
    this.statusList = new StatusListStore(this);
    this.title = new TitleStore(this);
    this.upgradeBanner = new UpgradeBannerStore(this);
  }
}

export const dashboardStore = new DashboardStore();
