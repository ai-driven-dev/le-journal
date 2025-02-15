import { observer } from 'mobx-react-lite';
import { useRef, type FC } from 'react';


import { CustomInstructionsConfirmation } from './custom-instructions-confirmation.component';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Skeleton } from '~/components/ui/skeleton';
import { Textarea } from '~/components/ui/textarea';
import { useGlobalStore } from '~/stores/root.provider';

export const CustomInstructions: FC = observer(() => {
  const formRef = useRef<HTMLFormElement>(null);
  const { dashboardStore } = useGlobalStore();

  const store = dashboardStore.customInstructions;
  const state = store.state;

  if (state === null || store.isLoading === true) {
    return <Skeleton className="h-[200px]" />;
  }

  return (
    <div className="mt-auto sticky bottom-0 bg-white border-t p-4">
      <form ref={formRef} onSubmit={store.save} className="space-y-4">
        <div className="flex space-x-4">
          <input type="hidden" name="id" value={state.id} />

          <label className="block text-sm font-medium text-gray-700 mb-2 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Comment devrions-nous personnaliser votre score de newsletter ? Que souhaitez-vous
                voir plus ou moins ?
              </span>
              <HoverCard>
                <HoverCardTrigger>
                  <span
                    className={`text-xs ${state.canUpdatePrompt === true ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {store.canUpdatePromptLabel}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent>
                  {state.canUpdatePrompt === true
                    ? 'Vous pouvez modifier vos instructions maintenant.'
                    : "Vous ne pouvez modifier vos instructions qu'une fois toutes les 24 heures."}
                </HoverCardContent>
              </HoverCard>
            </div>
            <Textarea
              name="promptInstruction"
              disabled={store.isSubmitting === true || state.canUpdatePrompt === false}
              id="ai-customization"
              value={state.promptInstruction}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                store.changeInstruction(e.target.value)
              }
              className="flex-1"
              placeholder="Entrez vos préférences de personnalisation..."
            />
          </label>
        </div>
      </form>

      <CustomInstructionsConfirmation store={store} formRef={formRef} />
    </div>
  );
});

CustomInstructions.displayName = 'CustomInstructions';
