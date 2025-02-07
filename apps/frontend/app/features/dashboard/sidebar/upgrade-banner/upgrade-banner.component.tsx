'use client';

import type { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { dashboardStore } from '../../global/dashboard.store';

import { Button } from '~/components/ui/button';

export const UpgradeBanner: FC = observer(() => {
  const store = dashboardStore.upgradeBanner;

  if (!store.isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
      <p className="font-semibold mb-2">Unlock premium features!</p>
      <Button variant="secondary" size="sm" onClick={store.handleUpgradeClick}>
        Upgrade Now
      </Button>
    </div>
  );
});
