import type { ReactNode } from 'react';

import { Layout } from '~/components/Layout';
import { DashboardWelcome } from '~/features/dashboard/components/DashboardWelcome';

export default function Dashboard(): ReactNode {
  return (
    <Layout>
      <DashboardWelcome />
    </Layout>
  );
}
