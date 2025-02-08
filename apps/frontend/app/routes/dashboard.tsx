import type { FC } from 'react';

import { Layout } from '~/components/Layout';
import { Dashboard } from '~/features/dashboard/dashboard.component';

const DashboardRoute: FC = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardRoute;
