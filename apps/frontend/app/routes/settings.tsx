import { observer } from 'mobx-react-lite';

import { Layout } from '@/components/Layout';

export default observer(function Settings() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
    </Layout>
  );
});
