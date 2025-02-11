export interface PromptInstruction {
  id: string;
  prompt: string;
}

export interface CustomPromptState extends PromptInstruction {
  isDialogOpen: boolean;
}

export interface CustomPromptActions {
  initializePrompt: (prompt: PromptInstruction) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
}
