import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export const ProjectEmailAlias: FC = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.projectStore;

  if (!store.currentProject) {
    return null;
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Votre Alias Email</CardTitle>
        <CardDescription>
          Utilisez cette adresse email pour recevoir les newsletters de votre projet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-4">
          <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {store.currentProject.newsletterAlias}
          </code>
        </div>
      </CardContent>
    </Card>
  );
});

ProjectEmailAlias.displayName = 'ProjectEmailAlias';
