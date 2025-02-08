'use client';

import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { Button } from '~/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '~/components/ui/sidebar';
import { AiCustomization } from './footer/ai-customization/ai-customization.component';
import { Title } from './header/title/title.component';
import { NewsletterTable } from './main/newsletter-table/newsletter-table.component';
import { StatusList } from './sidebar/status-list/status-list.component';
import { UpgradeBanner } from './sidebar/upgrade-banner/upgrade-banner.component';

export const Dashboard: FC = observer(() => {
  return (
    <div className="container mx-auto px-4">
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar collapsible="none">
            <SidebarHeader>
              <Button variant="ghost" className="font-bold text-xl">
                Le Journal
              </Button>
            </SidebarHeader>
            <SidebarContent>
              <aside className="col-span-3 space-y-6">
                <StatusList />
              </aside>
            </SidebarContent>
            <SidebarFooter>
              <UpgradeBanner />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <Title />
              </div>
            </header>
            <NewsletterTable />
            <AiCustomization />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
});
