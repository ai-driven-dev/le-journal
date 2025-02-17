import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { Layout } from '~/components/Layout';
import { AuthProvider } from '~/features/auth/auth.context';
import { Dashboard } from '~/features/dashboard/dashboard.component';
import globalStore, { GlobalStoreContext } from '~/stores/root.provider';

const DashboardRoute: FC = observer(() => {
  return (
    <Layout>
      <GlobalStoreContext.Provider value={globalStore}>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </GlobalStoreContext.Provider>
    </Layout>
  );
});

export default DashboardRoute;
