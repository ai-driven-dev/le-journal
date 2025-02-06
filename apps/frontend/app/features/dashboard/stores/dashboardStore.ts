import { makeAutoObservable } from 'mobx';

import type { DashboardState } from '../types/dashboard.types';

class DashboardStore implements DashboardState {
  readonly userName = 'Utilisateur';
  readonly lastVisit: Date | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export const dashboardStore = new DashboardStore();
