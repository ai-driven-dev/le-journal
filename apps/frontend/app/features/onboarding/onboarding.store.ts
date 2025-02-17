import { makeAutoObservable } from 'mobx';

import type { AuthStore } from '../auth/auth.store';

import { toast } from '~/hooks/use-toast';

export class OnboardingStore {
  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
  }

  createProject = async (): Promise<void> => {
    const res = await this.authStore.fetchWithAuth('/api/projects/create', 'POST');

    if (res.status === 200) {
      toast({
        variant: 'default',
        title: 'Projet par défaut créé',
      });
    }
  };

  setupCreateLabel = async (): Promise<void> => {
    const res = await this.authStore.fetchWithAuth('/api/projects/setup/label', 'POST');

    if (res.status === 200) {
      toast({
        variant: 'default',
        title: 'Label par défaut créé',
      });
    }
  };
}
