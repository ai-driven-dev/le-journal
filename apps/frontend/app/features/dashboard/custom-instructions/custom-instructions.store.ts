import type { ProjectPromptInstructions } from '@le-journal/shared-types';
import { makeAutoObservable, runInAction } from 'mobx';

import type { CustomInstructions } from './custom-instructions.type';

import { toast } from '~/hooks/use-toast';
import type { Loadable } from '~/interfaces/loadable.interface';
import { clientFetch } from '~/lib/api-fetcher.client';
import { verify } from '~/lib/validator';

export class CustomInstructionsStore
  implements CustomInstructions, Loadable<ProjectPromptInstructions>
{
  state: ProjectPromptInstructions | null = null;

  isDialogOpen = false;
  isLoading = true;
  isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = (project: ProjectPromptInstructions): void => {
    verify(project);

    runInAction(() => {
      this.state = project;
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
      const updatedState = await clientFetch<ProjectPromptInstructions>(event, this.state);
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

  get lastPromptUpdate(): string | null {
    return this.state?.lastPromptUpdate?.toLocaleDateString() ?? null;
  }
}
