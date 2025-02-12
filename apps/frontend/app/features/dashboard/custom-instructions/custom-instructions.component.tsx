import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { Textarea } from '~/components/ui/textarea';

export const CustomInstructions: FC = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.customInstructions;
  const state = store.state;

  if (state === null || store.isLoading) {
    return <Skeleton className="h-[200px]" />;
  }

  return (
    <div className="mt-auto sticky bottom-0 bg-white border-t p-4">
      <label htmlFor="ai-customization" className="block text-sm font-medium text-gray-700 mb-2">
        Comment devrions-nous personnaliser votre score de newsletter ? Que souhaitez-vous voir plus
        ou moins ?
      </label>
      <form method="put" action="#" onSubmit={store.save} className="flex space-x-4">
        <div className="flex space-x-4">
          <input type="hidden" name="id" value={state.id} />
          <Textarea
            name="promptInstruction"
            disabled={store.isSubmitting}
            id="ai-customization"
            value={state.promptInstruction}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              store.changeInstruction(e.target.value)
            }
            className="flex-1"
            placeholder="Entrez vos préférences de personnalisation..."
          />
          <div className="flex flex-col justify-between">
            <span className="text-sm text-gray-500">
              {state.promptInstruction.length}/200 tokens
            </span>

            <Button type="submit" disabled={store.isSubmitting}>
              Confirmer
            </Button>
            {/* <Dialog open={isDialogOpen} onOpenChange={store.setIsDialogOpen}>
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
                  <Button
                    variant="outline"
                    onClick={() => store.setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Confirmer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
          </div>
        </div>
      </form>
    </div>
  );
});
