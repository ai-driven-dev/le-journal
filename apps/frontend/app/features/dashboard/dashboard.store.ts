import { makeAutoObservable } from 'mobx';

import { createCustomPromptStore } from './custom-prompt/custom-prompt.store';
import { createEmailStore } from './emails/emails.store';
import { createHeaderProfileStore } from './header-profile/header-profile.store';
import { createNewsletterSubscriptionsStore } from './newsletter-subscriptions/newsletter-subscriptions.store';
import { createProjectStore } from './project/project.store';
import { createUpgradeBannerStore } from './upgrade-banner/upgrade-banner.store';

export class DashboardStore {
  createPromptStore = createCustomPromptStore();
  headerProfileStore = createHeaderProfileStore();
  newslettersStore = createNewsletterSubscriptionsStore();
  projectStore = createProjectStore();
  upgradeBannerStore = createUpgradeBannerStore();
  emailsStore = createEmailStore(this.projectStore);

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
