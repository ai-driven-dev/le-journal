import type { Newsletter } from '@le-journal/shared-types';

export interface NewsletterTableState {
  newsletters: Newsletter[];
  selectedNewsletterId: string | null;
  isDrawerOpen: boolean;
}

export interface NewsletterTableActions {
  setSelectedNewsletterId: (id: string | null) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  handleOpenDrawer: (e: React.MouseEvent) => void;
}
