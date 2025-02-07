'use client';

import type { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { Title } from './header/title/title.component';
import { NewsletterTable } from './main/newsletter-table/newsletter-table.component';
import { StatusList } from './sidebar/status-list/status-list.component';
import { AiCustomization } from './footer/ai-customization/ai-customization.component';
import { UpgradeBanner } from './sidebar/upgrade-banner/upgrade-banner.component';

export const Dashboard: FC = observer(() => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Title />

      <div className="container mx-auto py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <main className="col-span-9">
            <NewsletterTable />
          </main>

          {/* Sidebar */}
          <aside className="col-span-3 space-y-6">
            <StatusList />
            <UpgradeBanner />
          </aside>
        </div>
      </div>

      {/* Footer */}
      <AiCustomization />
    </div>
  );
});
