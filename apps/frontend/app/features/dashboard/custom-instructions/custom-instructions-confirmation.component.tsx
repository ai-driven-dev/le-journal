import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import type { CustomInstructionsStore } from './custom-instructions.store';

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

interface CustomInstructionsConfirmationProps {
  store: CustomInstructionsStore;
  formRef: React.RefObject<HTMLFormElement>;
}

export const CustomInstructionsConfirmation: FC<CustomInstructionsConfirmationProps> = observer(
  ({ store, formRef }) => {
    const handleConfirm = (): void => {
      store.closeDialog();
      formRef.current?.requestSubmit();
    };

    const { isDialogOpen, isSubmitting, instructionLength, openDialog, closeDialog } = store;

    return (
      <div className="flex flex-col justify-between">
        <span className="text-sm text-gray-500">{instructionLength}/200 tokens</span>

        <Dialog open={isDialogOpen} onOpenChange={openDialog}>
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
              <Button variant="outline" onClick={closeDialog} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button onClick={handleConfirm} type="submit" disabled={isSubmitting}>
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
);

CustomInstructionsConfirmation.displayName = 'CustomInstructionsConfirmation';
