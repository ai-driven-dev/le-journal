import { Link, useLoaderData } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { useEffect } from 'react';

import { CustomInstructions } from './custom-instructions/custom-instructions.component';
import { useDashboardStores } from './dashboard.context';
import type { DashboardLoaderData } from './dashboard.loader';
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

export const Dashboard: FC = observer(() => {
  const data = useLoaderData<DashboardLoaderData>();
  const { dashboardStore } = useDashboardStores();

  useEffect(() => {
    if (data === null) {
      return;
    }

    const { projects, newsletters, users, emails } = data;

    // Optional data.
    if (emails.length > 0) {
      dashboardStore.emailsStore.loadEmails(emails);
    }

    const currentProject = projects[0];

    // Required data.
    dashboardStore.projectStore.init(currentProject);
    dashboardStore.customInstructions.init({
      id: currentProject.id,
      promptInstruction: currentProject.promptInstruction,
    });
    dashboardStore.newslettersStore.loadNewsletters(newsletters);
    dashboardStore.headerProfileStore.loadUserInfo(users[0]);
  }, [dashboardStore, data]);

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
