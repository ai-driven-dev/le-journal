import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { IStatusListActions, IStatusListState } from './status-list.type';

export class StatusListStore implements IStatusListState, IStatusListActions {
  userAlias = 'user123@lejournal.ai';
  isHoverCardOpen = false;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setIsHoverCardOpen = (isOpen: boolean): void => {
    this.isHoverCardOpen = isOpen;
  };

  copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(this.userAlias);
      console.log('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
}
