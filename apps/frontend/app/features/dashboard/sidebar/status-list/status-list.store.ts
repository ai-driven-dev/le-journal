import { makeAutoObservable } from 'mobx';

import { mockStatusListState } from './status-list.mock';
import type { StatusListState } from './status-list.type';

export class StatusListStore implements StatusListState {
  userAlias = mockStatusListState.userAlias;
  isHoverCardOpen = mockStatusListState.isHoverCardOpen;
  items = mockStatusListState.items;

  constructor() {
    makeAutoObservable(this);
  }

  copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(this.userAlias);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  setIsHoverCardOpen = (isOpen: boolean): void => {
    this.isHoverCardOpen = isOpen;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStatusListStore = () => new StatusListStore();
