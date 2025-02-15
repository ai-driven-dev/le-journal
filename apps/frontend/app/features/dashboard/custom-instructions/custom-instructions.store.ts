import type { ProjectPromptInstructions } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import type { CustomInstructions } from './custom-instructions.type';

import type { AuthStore } from '~/features/auth/auth.store';
import { toast } from '~/hooks/use-toast';
import type { Loadable } from '~/interfaces/loadable.interface';
import { API_ROUTES_PUT } from '~/lib/api-fetcher';
import { verify } from '~/lib/validator';

export class CustomInstructionsStore
  implements CustomInstructions, Loadable<ProjectPromptInstructions>
{
  authStore: AuthStore;
  state: ProjectPromptInstructions | null = null;

  isDialogOpen = false;
  isLoading = true;
  isSubmitting = false;

  constructor(authStore: AuthStore) {
    makeAutoObservable(this);
    this.authStore = authStore;
  }

  init = (project: ProjectPromptInstructions): void => {
    verify(project);
    runInAction(() => {
      this.state = {
        id: project.id,
        promptInstruction: project.promptInstruction,
        lastPromptUpdate: project.lastPromptUpdate ? new Date(project.lastPromptUpdate) : null,
        canUpdatePrompt: project.canUpdatePrompt,
      };
      this.isLoading = false;
    });
  };

  save = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

      const updatedState = await this.authStore.fetchWithAuth<ProjectPromptInstructions>(
        API_ROUTES_PUT.projects,
        'PUT',
        event,
      );

      this.init(updatedState);

      toast({
        title: 'Instructions sauvegardées',
        description: 'Vos préférences de personnalisation ont été mises à jour.',
      });
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la sauvegarde de vos préférences.',
      });
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
    return this.state?.promptInstruction.length ?? 0;
  }

  get canUpdatePrompt(): boolean {
    return this.state?.canUpdatePrompt ?? false;
  }

  get canUpdatePromptLabel(): string {
    if (this.canUpdatePrompt) {
      return "Aujourd'hui, vous pouvez modifier vos instructions.";
    }

    if (this.state !== null && this.state.lastPromptUpdate !== null) {
      const modifiedDate = this.state.lastPromptUpdate.toLocaleDateString();
      const modifiedTime = this.state.lastPromptUpdate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      return `Dernière modification le ${modifiedDate} à ${modifiedTime}.`;
    }

    return 'Pas encore de modification';
  }
}
