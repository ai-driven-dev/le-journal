import type { Project } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast as sonnerToast } from 'sonner';

import type { AuthStore } from '../auth/auth.store';

import type { Loadable } from '~/interfaces/loadable.interface';
import type { Endpoint } from '~/lib/api-fetcher';

export type StepState = 'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'ALREADY_EXISTS' | 'ERROR';

export interface OnboardingStep {
  state: StepState;
  label: string;
  message?: string;
  routeToCall: Endpoint;
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

  checkProjectExists = async (): Promise<boolean> => {
    const response = await this.authStore.fetchWithAuth('/api/projects/1', 'GET');

    if (response.status !== 200) {
      return false;
    }

    const data = await response.json();

    if (data !== undefined) {
      runInAction(() => {
        this.state = data;
      });
      return true;
    }

    return false;
  };

  get canProcess(): boolean {
    return !this.isProcessing;
  }

  get isComplete(): boolean {
    return this.steps.every((step) => step.state === 'SUCCESS' || step.state === 'ALREADY_EXISTS');
  }

  setProject = (data: unknown): void => {
    runInAction(() => {
      this.state = data as Project;
    });
  };

  updateStep = (stepIndex: number, state: StepState, message?: string): void => {
    this.steps[stepIndex].state = state;
    this.steps[stepIndex].message = message;
    if (message) sonnerToast(message);

    if (state === 'ERROR') {
      this.isProcessing = false;
    }
  };

  load = async (): Promise<void> => {
    if (this.isProcessing) return;

    runInAction(() => {
      this.isProcessing = true;
    });

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];

      if (i === 0) {
        const projectExists = await this.checkProjectExists();
        if (projectExists) {
          runInAction(() => {
            this.updateStep(i, 'ALREADY_EXISTS', 'Le projet existe déjà');
          });
          continue;
        }
      }

      if (step.state !== 'PENDING' && step.state !== 'ERROR') {
        continue;
      }

      try {
        runInAction(() => {
          this.updateStep(i, 'IN_PROGRESS');
        });

        const isProjectIdRequired =
          step.routeToCall === '/api/project/setup/label' ||
          step.routeToCall === '/api/project/setup/test' ||
          step.routeToCall === '/api/project/setup/filter';

        if (isProjectIdRequired && this.state?.id === undefined) {
          throw new Error("Le projet n'est pas disponible");
        }

        const body = isProjectIdRequired ? { projectId: this.state?.id } : undefined;

        const response = await this.authStore.fetchWithAuth(step.routeToCall, 'POST', body);

        const data = await response.json();

        if (response.status.toString().startsWith('5') || response.status === 400) {
          runInAction(() => this.updateStep(i, 'ERROR', data.message));
          return;
        } else if (response.status === 404 && i === 0) {
          runInAction(() => this.updateStep(i, 'ERROR', data.message));
          return;
        } else if (response.status === 409) {
          runInAction(() => {
            this.updateStep(i, 'ALREADY_EXISTS', data.message);
          });
          continue;
        } else if (response.status === 200 || response.status === 201) {
          switch (step.routeToCall) {
            case '/api/projects/create':
              this.updateStep(i, 'SUCCESS', 'Votre projet a été créé avec succès !');
              runInAction(() => {
                this.setProject(data);
              });
              break;
            case '/api/project/setup/label':
              this.updateStep(i, 'SUCCESS', 'Le label a été ajouté à votre projet !');
              break;
            case '/api/project/setup/filter':
              this.updateStep(i, 'SUCCESS', 'Le filtre a été configuré avec succès !');
              break;
            case '/api/project/setup/test':
              this.updateStep(i, 'SUCCESS', "L'email de test a été envoyé !");
              break;
          }
        }
      } catch (error) {
        runInAction(() => {
          this.updateStep(
            i,
            'ERROR',
            error instanceof Error ? error.message : 'Une erreur est survenue',
          );
        });
        return;
      }
    }

    runInAction(() => {
      this.isProcessing = false;
    });
  };
}
