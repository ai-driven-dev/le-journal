import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { Layout } from '~/components/Layout';
import { Dashboard } from '~/features/dashboard/dashboard.component';
import { DashboardProvider } from '~/features/dashboard/dashboard.context';

export { loader } from '~/features/dashboard/dashboard.loader';

const DashboardRoute: FC = observer(() => {
  return (
    <Layout>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </Layout>
  );
});

export default DashboardRoute;
