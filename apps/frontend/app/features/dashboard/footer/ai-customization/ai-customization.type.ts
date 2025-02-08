export interface AiCustomizationState {
  customization: string;
  isDialogOpen: boolean;
}

export interface AiCustomizationActions {
  setCustomization: (value: string) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleSave: () => void;
}
