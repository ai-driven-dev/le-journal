import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { Copy } from 'lucide-react';

import { useDashboardStores } from '../../dashboard.context';

import { Button } from '~/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';

export const StatusList: FC = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.statusList;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <HoverCard open={store.isHoverCardOpen} onOpenChange={store.setIsHoverCardOpen}>
          <HoverCardTrigger asChild>
            <Button variant="ghost" className="p-0 font-normal">
              <span className="text-sm text-muted-foreground">{store.userAlias}</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Identifiant unique</h4>
                <p className="text-sm text-muted-foreground">
                  Utilisez cet identifiant pour référencer votre compte.
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={store.copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <nav className="space-y-1">
        {store.items.map((item) => (
          <Button key={item.id} variant="ghost" className="w-full justify-start font-normal">
            <div className="flex items-center justify-between w-full">
              <span>{item.label}</span>
              <span className="ml-auto text-muted-foreground">{item.count}</span>
            </div>
          </Button>
        ))}
      </nav>
    </div>
  );
});
