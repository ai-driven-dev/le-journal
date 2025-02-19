import type { ProjectPromptInstructions } from '@le-journal/shared-types';
import { isString } from 'class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import type { CustomInstructions } from './custom-instructions.type';

import type { AuthStore } from '~/features/auth/auth.store';
import { toast } from '~/hooks/use-toast';
import { verify } from '~/lib/validator';

export class CustomInstructionsStore implements CustomInstructions {
  authStore: AuthStore;
  state: ProjectPromptInstructions | null = null;
  error: string | undefined;

  isDialogOpen = false;
  isLoading = true;
  isSubmitting = false;

  constructor(authStore: AuthStore) {
    makeAutoObservable(this);
    this.authStore = authStore;
  }

  load = (project: ProjectPromptInstructions): void => {
    verify(project);
    runInAction(() => {
      this.state = {
        id: project.id,
        promptInstruction: project.promptInstruction,
        lastPromptUpdate: project.lastPromptUpdate,
        canUpdatePrompt: project.canUpdatePrompt,
      };
      this.isLoading = false;
    });
  };

  save = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (this.state === null) {
      throw new Error('State is null');
    }

    if (this.state.canUpdatePrompt === false) {
      toast({
        variant: 'destructive',
        title: 'Modification impossible',
        description: "Vous ne pouvez modifier vos instructions qu'une fois toutes les 24 heures.",
      });
      return;
    }

    try {
      verify(this.state);

      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      const updatedState = await this.authStore
        .fetchWithAuth('/api/projects/prompt', 'PUT', data)
        .then(async (res) => {
          const data = await res.json();

          if (!res.status.toString().startsWith('2')) {
            this.error = res.statusText;

            const message = Array.isArray(data.message) ? data.message.join('\n') : data.message;

            toast({
              variant: 'destructive',
              title: 'Erreur',
              description: message,
            });
            return;
          }

          return data;
        });

      this.load(updatedState);

      verify(this.state);

      toast({
        title: 'Instructions sauvegardées',
        description: 'Vos préférences de personnalisation ont été mises à jour.',
      });
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };

  changeInstruction = (instruction: string): void => {
    if (this.state === null) {
      throw new Error('State is null');
    }

    runInAction(() => {
      this.state!.promptInstruction = instruction;
    });
  };

  openDialog = (): void => {
    this.isDialogOpen = true;
  };

  closeDialog = (): void => {
    this.isDialogOpen = false;
  };

  get instructionLength(): number {
    const prompt = this.state?.promptInstruction || '';

    return prompt.length;
  }

  get canUpdatePrompt(): boolean {
    return this.state?.canUpdatePrompt ?? false;
  }

  get canUpdatePromptLabel(): string {
    if (this.canUpdatePrompt) {
      return "Aujourd'hui, vous pouvez modifier vos instructions.";
    }

    return 'Pas encore de modification';
  }

  get lastPromptUpdate(): string {
    if (this.state !== null && isString(this.state.lastPromptUpdate)) {
      const modifiedDate = new Date(this.state.lastPromptUpdate).toLocaleDateString();
      const modifiedTime = new Date(this.state.lastPromptUpdate).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      return `Dernière modification le ${modifiedDate} à ${modifiedTime}.`;
    }

    return '';
  }
}
