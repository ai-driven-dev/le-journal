'use client';

import { Check, Clock, Copy, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { dashboardStore } from '../../global/dashboard.store';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';

export const StatusList: FC = observer(() => {
  const store = dashboardStore.statusList;

  return (
    <div className="space-y-6">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Newsletter Alias</CardTitle>
        </CardHeader>
        <CardContent>
          <HoverCard open={store.isHoverCardOpen} onOpenChange={store.setIsHoverCardOpen}>
            <HoverCardTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="truncate">{store.userAlias}</span>
                <Copy className="h-4 w-4 ml-2" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">About Your Alias</h4>
                <p className="text-sm">
                  This is your unique newsletter alias. Use it to subscribe to newsletters without
                  revealing your real email address.
                </p>
                <p className="text-sm">
                  Content: Your alias allows you to receive curated content from various sources,
                  tailored to your interests. It helps manage your subscriptions and filter out
                  unwanted emails.
                </p>
                <Button size="sm" onClick={store.copyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-lg font-semibold mb-2">Newsletter Status</h3>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <Check className="text-green-500" />
            <span>Validated registrations</span>
          </li>
          <li className="flex items-center space-x-2">
            <Clock className="text-yellow-500" />
            <span>Pending validations</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-400">
            <X />
            <span>Blocked newsletters</span>
          </li>
        </ul>
      </div>
    </div>
  );
});
