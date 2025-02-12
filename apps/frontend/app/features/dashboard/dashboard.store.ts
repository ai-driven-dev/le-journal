import { makeAutoObservable } from 'mobx';

import { CustomInstructionsStore } from './custom-instructions/custom-instructions.store';
import { EmailsStore } from './emails/emails.store';
import { createHeaderProfileStore } from './header-profile/header-profile.store';
import { createNewsletterSubscriptionsStore } from './newsletter-subscriptions/newsletter-subscriptions.store';
import { createProjectStore } from './project/project-alias.store';
import { createUpgradeBannerStore } from './upgrade-banner/upgrade-banner.store';

export class DashboardStore {
  customInstructions = new CustomInstructionsStore();
  headerProfileStore = createHeaderProfileStore();
  newslettersStore = createNewsletterSubscriptionsStore();
  projectStore = createProjectStore();
  upgradeBannerStore = createUpgradeBannerStore();
  emailsStore = new EmailsStore();

  constructor() {
    makeAutoObservable(this);
  }
}

let store: DashboardStore | null = null;

export function createDashboardStore(): DashboardStore {
  if (!store) {
    store = new DashboardStore();
  }
  return store;
}
