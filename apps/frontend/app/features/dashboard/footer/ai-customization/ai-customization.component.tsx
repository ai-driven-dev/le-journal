'use client';

import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { dashboardStore } from '../../global/dashboard.store';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Textarea } from '~/components/ui/textarea';

export const AiCustomization: FC = observer(() => {
  const store = dashboardStore.aiCustomization;

  return (
    <div className="bg-white border-t p-4">
      <label htmlFor="ai-customization" className="block text-sm font-medium text-gray-700 mb-2">
        How should we personalize your newsletter score? What do you want to see more or less?
      </label>
      <div className="flex space-x-4">
        <Textarea
          id="ai-customization"
          value={store.customization}
          onChange={(e) => store.setCustomization(e.target.value)}
          className="flex-1"
          placeholder="Enter your customization preferences..."
        />
        <div className="flex flex-col justify-between">
          <span className="text-sm text-gray-500">{store.customization.length}/200 tokens</span>
          <Dialog open={store.isDialogOpen} onOpenChange={store.setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Save</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Customization</DialogTitle>
                <DialogDescription>
                  Are you sure you want to save these customization preferences?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => store.setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={store.handleSave}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
});
