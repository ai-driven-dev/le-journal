import type { ProjectType } from '@le-journal/shared-types';
import { useFetcher } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { API_ROUTES_PUT, getApiUrl } from '~/utils/api/fetcher';

export const AiCustomization: FC = observer(() => {
  const fetcher = useFetcher<ProjectType>();
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.createPromptStore;
  const state = store.state;

  if (state === null) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch(getApiUrl(API_ROUTES_PUT.projects), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: formData.get('id'),
        promptInstruction: formData.get('prompt'),
      }),
    });

    if (response.ok) {
      const updatedPrompt = await response.json();
      // VALIDATE and use same type
      store.init({
        id: updatedPrompt.id,
        promptInstruction: updatedPrompt.promptInstruction,
      });
    } else {
      console.error('Erreur lors de la mise à jour du prompt');
    }
  };

  const isSubmitting = fetcher.state === 'submitting';
  const formAction = getApiUrl(API_ROUTES_PUT.projects);

  return (
    <div className="mt-auto sticky bottom-0 bg-white border-t p-4">
      <label htmlFor="ai-customization" className="block text-sm font-medium text-gray-700 mb-2">
        Comment devrions-nous personnaliser votre score de newsletter ? Que souhaitez-vous voir plus
        ou moins ?
      </label>
      <fetcher.Form
        method="put"
        action={formAction}
        onSubmit={handleSubmit}
        className="flex space-x-4"
      >
        <div className="flex space-x-4">
          <input type="hidden" name="id" value={state.id} />
          <Textarea
            name="prompt"
            disabled={isSubmitting}
            id="ai-customization"
            value={state.promptInstruction}
            onChange={(e) => store.init({ id: state.id, promptInstruction: e.target.value })}
            className="flex-1"
            placeholder="Entrez vos préférences de personnalisation..."
          />
          <div className="flex flex-col justify-between">
            <span className="text-sm text-gray-500">
              {state.promptInstruction?.length}/200 tokens
            </span>

            <Button type="submit" disabled={isSubmitting}>
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
      </fetcher.Form>
    </div>
  );
});
