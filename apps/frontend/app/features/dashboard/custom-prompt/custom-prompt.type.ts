export interface CustomPromptState {
  customization: string;
  isDialogOpen: boolean;
}

export interface CustomPromptActions {
  setCustomization: (value: string) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleSave: () => void;
}
