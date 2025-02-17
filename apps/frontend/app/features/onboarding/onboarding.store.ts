import type { Project } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import type { AuthStore } from '../auth/auth.store';

import type { Loadable } from '~/interfaces/loadable.interface';
import type { Endpoint } from '~/lib/api-fetcher';

export type StepState = 'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'ALREADY_EXISTS' | 'ERROR';

export interface OnboardingStep {
  state: StepState;
  label: string;
  errorMessage?: string;
  message?: string;
  routeToCall: Endpoint;
  onSuccess?: (data: unknown) => void;
}

export class OnboardingStore implements Loadable<Project> {
  isLoading = false;
  state: Project | null = null;
  isProcessing = false;

  steps: OnboardingStep[] = [
    {
      state: 'PENDING',
      label: "Création d'un nouveau projet",
      routeToCall: '/api/projects/create',
      onSuccess: (data: unknown): void => {
        if (typeof data === 'object' && data !== null && 'id' in data) {
          runInAction(() => {
            this.state = data as Project;
          });
        }
      },
    },
    {
      state: 'PENDING',
      label: 'Nouveau label Le Journal',
      routeToCall: '/api/project/setup/label',
    },
    {
      state: 'PENDING',
      label: 'Nouveau filtre pour trier vos newsletters.',
      routeToCall: '/api/project/setup/filter',
    },
    {
      state: 'PENDING',
      label: "Envoi d'un mail de test.",
      routeToCall: '/api/project/setup/test',
    },
  ];

  constructor(private readonly authStore: AuthStore) {
    makeAutoObservable(this);
  }

  get canProcess(): boolean {
    return !this.isProcessing;
  }

  get isComplete(): boolean {
    return this.steps.every((step) => step.state === 'SUCCESS' || step.state === 'ALREADY_EXISTS');
  }

  load = async (): Promise<void> => {
    if (this.isProcessing) return;

    runInAction(() => {
      this.isProcessing = true;
    });

    for (const step of this.steps) {
      if (step.state === 'SUCCESS' || step.state === 'ALREADY_EXISTS') continue;

      try {
        runInAction(() => {
          step.state = 'IN_PROGRESS';
          step.errorMessage = undefined;
          step.message = undefined;
        });

        const body =
          step.routeToCall === '/api/projects/create' ? undefined : { projectId: this.state?.id };

        const response = await this.authStore.fetchWithAuth(step.routeToCall, 'POST', body);
        const data = await response.json();

        runInAction(() => {
          if (response.status === 409) {
            step.state = 'ALREADY_EXISTS';
            step.message = data.message;
          } else {
            step.state = 'SUCCESS';
            switch (step.routeToCall) {
              case '/api/projects/create':
                step.message = 'Votre projet a été créé avec succès !';
                break;
              case '/api/project/setup/label':
                step.message = 'Le label a été ajouté à votre projet !';
                break;
              case '/api/project/setup/filter':
                step.message = 'Le filtre a été configuré avec succès !';
                break;
              case '/api/project/setup/test':
                step.message = "L'email de test a été envoyé !";
                break;
            }
            if (step.onSuccess) {
              step.onSuccess(data);
            }
          }
        });
      } catch (error) {
        runInAction(() => {
          step.state = 'ERROR';
          step.errorMessage = error instanceof Error ? error.message : 'An error occurred';
          step.message = undefined;
          this.isProcessing = false;
        });
        return;
      }
    }

    runInAction(() => {
      this.isProcessing = false;
    });
  };
}
