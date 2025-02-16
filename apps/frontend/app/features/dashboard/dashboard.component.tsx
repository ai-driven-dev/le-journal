import { Link } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { useEffect } from 'react';

import { CustomInstructions } from './custom-instructions/custom-instructions.component';
import { NewsletterTable } from './emails/emails.component';
import { HeaderProfile } from './header-profile/header-profile.component';
import { NewsletterSubscriptions } from './newsletter-subscriptions/newsletter-subscriptions.component';
import { ProjectEmailAlias } from './project/project-alias.component';
import { UpgradeBanner } from './upgrade-banner/upgrade-banner.component';

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
import { useGlobalStore } from '~/stores/root.provider';

export const Dashboard: FC = observer(() => {
  const { dashboardStore } = useGlobalStore();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dashboardStore.init();
  }, [dashboardStore]);

  return (
    <div className="container mx-auto px-4">
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar collapsible="none">
            <SidebarHeader>
              <Button variant="ghost" className="font-bold text-xl" asChild>
                <Link to="/">Le Journal</Link>
              </Button>
            </SidebarHeader>
            <SidebarContent>
              <aside className="col-span-3 space-y-6">
                <ProjectEmailAlias />
                <NewsletterSubscriptions />
              </aside>
            </SidebarContent>
            <SidebarFooter>
              <UpgradeBanner />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <SidebarInset className="flex-1">
            <HeaderProfile />

            <NewsletterTable />
            <CustomInstructions />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
});
