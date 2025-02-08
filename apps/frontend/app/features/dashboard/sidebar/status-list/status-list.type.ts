import type { StatusItem } from '@le-journal/shared-types';

export interface StatusListState {
  userAlias: string;
  isHoverCardOpen: boolean;
  items: StatusItem[];
}

export interface StatusListActions {
  copyToClipboard: () => Promise<void>;
  setIsHoverCardOpen: (isOpen: boolean) => void;
}
