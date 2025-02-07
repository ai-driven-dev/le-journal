import { makeAutoObservable } from 'mobx';

import type { DashboardStore } from '../../global/dashboard.store';

import type { IStatusListState } from './status-list.type';

export class StatusListStore implements IStatusListState {
  userAlias = 'user123@lejournal.ai';
  isHoverCardOpen = false;

  constructor(private readonly dashboardStore: DashboardStore) {
    makeAutoObservable(this);
  }

  setIsHoverCardOpen = (isOpen: boolean) => {
    this.isHoverCardOpen = isOpen;
  };

  copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(this.userAlias);
      console.log('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
}
