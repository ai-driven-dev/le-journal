import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { Layout } from '~/components/Layout';
import { Dashboard } from '~/features/dashboard/dashboard.component';

const DashboardRoute: FC = observer(() => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
});

export default DashboardRoute;
