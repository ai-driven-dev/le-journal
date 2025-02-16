import type { Email, Newsletter, Project, User } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { AuthStore } from '../auth/auth.store';

import { CustomInstructionsStore } from './custom-instructions/custom-instructions.store';
import { EmailsStore } from './emails/emails.store';
import { HeaderProfileStore } from './header-profile/header-profile.store';
import { NewsletterSubscriptionsStore } from './newsletter-subscriptions/newsletter-subscriptions.store';
import { createProjectStore } from './project/project-alias.store';
import { createUpgradeBannerStore } from './upgrade-banner/upgrade-banner.store';

export class DashboardStore {
  customInstructions: CustomInstructionsStore;
  headerProfileStore: HeaderProfileStore;
  newslettersStore: NewsletterSubscriptionsStore;
  projectStore = createProjectStore();
  upgradeBannerStore = createUpgradeBannerStore();
  emailsStore = new EmailsStore();

  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
    this.customInstructions = new CustomInstructionsStore(authStore);
    this.headerProfileStore = new HeaderProfileStore(authStore);
    this.newslettersStore = new NewsletterSubscriptionsStore();
  }

  async init(): Promise<void> {
    const [newsletters, user, projects] = await Promise.all([
      this.authStore.fetchWithAuth('/api/newsletters', 'GET').then((res) => res.json()),
      this.authStore.fetchWithAuth('/api/users/me', 'GET').then((res) => res.json()),
      this.authStore.fetchWithAuth('/api/projects', 'GET').then((res) => res.json()),
    ]);

    const project = (projects as Project[])[0];

    const emails = await this.authStore
      .fetchWithAuth('/api/newsletters/emails', 'GET', undefined, { projectId: project.id })
      .then((res) => res.json());

    this.projectStore.init(project);
    this.customInstructions.load({
      id: project.id,
      promptInstruction: project.promptInstruction,
      lastPromptUpdate: project.lastPromptUpdate,
      canUpdatePrompt: project.canUpdatePrompt,
    });
    this.newslettersStore.load(newsletters as Newsletter[]);
    this.headerProfileStore.load(user as User);

    this.emailsStore.load(emails as Email[]);
  }
}
