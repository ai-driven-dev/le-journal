import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

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
  const { dashboardStore } = useDashboardStores();
  const { customization, isDialogOpen } = dashboardStore.createPromptStore;
  const store = dashboardStore.createPromptStore;

  return (
    <div className="bg-white border-t p-4">
      <label htmlFor="ai-customization" className="block text-sm font-medium text-gray-700 mb-2">
        Comment devrions-nous personnaliser votre score de newsletter ? Que souhaitez-vous voir plus
        ou moins ?
      </label>
      <div className="flex space-x-4">
        <Textarea
          id="ai-customization"
          value={customization}
          onChange={(e) => store.setCustomization(e.target.value)}
          className="flex-1"
          placeholder="Entrez vos préférences de personnalisation..."
        />
        <div className="flex flex-col justify-between">
          <span className="text-sm text-gray-500">{customization.length}/200 tokens</span>
          <Dialog open={isDialogOpen} onOpenChange={store.setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Enregistrer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la personnalisation</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir enregistrer ces préférences de personnalisation ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => store.setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={store.handleSave}>Confirmer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
});
