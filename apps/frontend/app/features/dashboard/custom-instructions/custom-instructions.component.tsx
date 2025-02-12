import { PROJECT_MAX_LENGTH, PROJECT_MIN_LENGTH } from '@le-journal/shared-types';
import { observer } from 'mobx-react-lite';
import { useRef, type FC } from 'react';

import { useDashboardStores } from '../dashboard.context';

import { CustomInstructionsConfirmation } from './custom-instructions-confirmation.component';

import { Skeleton } from '~/components/ui/skeleton';
import { Textarea } from '~/components/ui/textarea';

export const CustomInstructions: FC = observer(() => {
  const formRef = useRef<HTMLFormElement>(null);
  const { dashboardStore } = useDashboardStores();

  const store = dashboardStore.customInstructions;
  const state = store.state;

  if (state === null || store.isLoading) {
    return <Skeleton className="h-[200px]" />;
  }

  return (
    <div className="mt-auto sticky bottom-0 bg-white border-t p-4">
      <form ref={formRef} onSubmit={store.save} className="space-y-4">
        <div className="flex space-x-4">
          <input type="hidden" name="id" value={state.id} />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-sm font-medium text-gray-700 mb-2">
              Comment devrions-nous personnaliser votre score de newsletter ? Que souhaitez-vous
              voir plus ou moins ?
            </span>
            <Textarea
              name="promptInstruction"
              disabled={store.isSubmitting}
              id="ai-customization"
              value={state.promptInstruction}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                store.changeInstruction(e.target.value)
              }
              minLength={PROJECT_MIN_LENGTH}
              maxLength={PROJECT_MAX_LENGTH}
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
