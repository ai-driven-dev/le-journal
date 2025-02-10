import { Link, useLoaderData } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { useEffect } from 'react';

import { AiCustomization } from './custom-prompt/custom-prompt.component';
import { useDashboardStores } from './dashboard.context';
import type { DashboardLoaderData } from './dashboard.loader';
import { NewsletterTable } from './emails/emails.component';
import { Title } from './header-profile/header-profile.component';
import NewsletterSubscriptions from './newsletter-subscriptions/newsletter-subscriptions.component';
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

    // Required data.
    dashboardStore.projectStore.setCurrentProject(projects[0]);
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
