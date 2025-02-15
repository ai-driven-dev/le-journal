import type { Email, Newsletter, Project, User } from '@le-journal/shared-types';
import { makeAutoObservable } from 'mobx';

import type { AuthStore } from '../auth/auth.store';

import { CustomInstructionsStore } from './custom-instructions/custom-instructions.store';
import { EmailsStore } from './emails/emails.store';
import { HeaderProfileStore } from './header-profile/header-profile.store';
import { createNewsletterSubscriptionsStore } from './newsletter-subscriptions/newsletter-subscriptions.store';
import { createProjectStore } from './project/project-alias.store';
import { createUpgradeBannerStore } from './upgrade-banner/upgrade-banner.store';

import { API_ROUTES_GET } from '~/lib/api-fetcher';
import { verify } from '~/lib/validator';

export class DashboardStore {
  customInstructions: CustomInstructionsStore;
  headerProfileStore: HeaderProfileStore;
  newslettersStore = createNewsletterSubscriptionsStore();
  projectStore = createProjectStore();
  upgradeBannerStore = createUpgradeBannerStore();
  emailsStore = new EmailsStore();

  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
    this.customInstructions = new CustomInstructionsStore(authStore);
    this.headerProfileStore = new HeaderProfileStore(authStore);
  }

  async init(): Promise<void> {
    const [newsletters, users, projects] = await Promise.all([
      this.authStore.fetchWithAuth(API_ROUTES_GET.newsletters, 'GET'),
      this.authStore.fetchWithAuth(API_ROUTES_GET.users, 'GET'),
      this.authStore.fetchWithAuth(API_ROUTES_GET.projects, 'GET'),
    ]);

    const project = (projects as Project[])[0];
    verify(project);

    const emails = await this.authStore.fetchWithAuth(
      API_ROUTES_GET.newsletterEmails,
      'GET',
      undefined,
      { projectId: project.id },
    );

    if (this.customInstructions === null) {
      throw new Error('Custom instructions store is not initialized');
    }

    this.projectStore.init(project);
    this.customInstructions.init({
      id: project.id,
      promptInstruction: project.promptInstruction,
      lastPromptUpdate: project.lastPromptUpdate ?? null,
      canUpdatePrompt: project.canUpdatePrompt,
    });
    this.newslettersStore.loadNewsletters(newsletters as Newsletter[]);
    this.headerProfileStore.loadUserInfo((users as User[])[0]);

    if ((emails as Email[]).length > 0) {
      this.emailsStore.loadEmails(emails as Email[]);
    }
  }
}
