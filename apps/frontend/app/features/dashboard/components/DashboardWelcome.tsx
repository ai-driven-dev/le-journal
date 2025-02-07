import { observer } from 'mobx-react-lite';
import type { ReactNode } from 'react';

import { AICustomization } from './Elements/ai-customization';
import { DashboardHeader } from './Elements/header';
import { NewsletterStatus } from './Elements/newsletter-status';
import { NewsletterTable } from './Elements/newsletter-table';
import { UpgradeBanner } from './Elements/upgrade-banner';

export const DashboardWelcome = observer((): ReactNode => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 flex">
        <main className="flex-1 p-6">
          <NewsletterTable />
        </main>
        <aside className="w-80 border-l p-6">
          <NewsletterStatus />
        </aside>
      </div>
      <UpgradeBanner />
      <AICustomization />
    </div>
  );
});
