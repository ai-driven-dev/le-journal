import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { Layout } from '~/components/Layout';
import { Dashboard } from '~/features/dashboard/dashboard.component';
import globalStore, { GlobalStoreContext } from '~/stores/root.provider';

const DashboardRoute: FC = observer(() => {
  return (
    <Layout>
      <GlobalStoreContext.Provider value={globalStore}>
        <Dashboard />
      </GlobalStoreContext.Provider>
    </Layout>
  );
});

export default DashboardRoute;
