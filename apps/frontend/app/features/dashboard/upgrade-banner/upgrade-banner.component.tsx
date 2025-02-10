import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

import { Button } from '~/components/ui/button';

export const UpgradeBanner: FC = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.upgradeBannerStore;

  if (!store.isVisible) {
    return null;
  }

  return (
    <div className="mt-auto sticky bottom-0 bg-white border-t p-4 space-y-4">
      <h3 className="text-lg font-semibold">Passez à la version Pro</h3>
      <p className="text-sm text-gray-600">
        Accédez à toutes les fonctionnalités et personnalisez votre expérience.
      </p>
      <div className="flex justify-between items-center">
        <Button onClick={store.handleUpgrade}>Upgrade</Button>
        <Button disabled variant="ghost" size="sm" onClick={() => store.setIsVisible(false)}>
          Plus tard
        </Button>
      </div>
    </div>
  );
});
