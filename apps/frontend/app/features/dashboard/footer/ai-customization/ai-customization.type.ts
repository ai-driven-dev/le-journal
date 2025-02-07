export interface IAiCustomizationState {
  customization: string;
  isDialogOpen: boolean;
}

export interface IAiCustomizationActions {
  setCustomization: (value: string) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleSave: () => void;
}
