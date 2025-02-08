import { observer } from 'mobx-react-lite';
import { createContext, useContext, type FC, type PropsWithChildren } from 'react';

import type { DashboardStore } from './dashboard.store';
import { createDashboardStore } from './dashboard.store';

interface DashboardStores {
  dashboardStore: DashboardStore;
}

const DashboardContext = createContext<DashboardStores | null>(null);

export const DashboardProvider: FC<PropsWithChildren> = observer(({ children }) => {
  const stores: DashboardStores = {
    dashboardStore: createDashboardStore(),
  };

  return <DashboardContext.Provider value={stores}>{children}</DashboardContext.Provider>;
});

export const useDashboardStores = (): DashboardStores => {
  const stores = useContext(DashboardContext);
  if (!stores) {
    throw new Error('useDashboardStores must be used within DashboardProvider');
  }
  return stores;
};
