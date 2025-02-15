import type { Email } from '@le-journal/shared-types';
import { Accordion } from '@radix-ui/react-accordion';
import { observer } from 'mobx-react-lite';


import { EmailRow } from './email-row.component';

import { Skeleton } from '~/components/ui/skeleton';
import { useGlobalStore } from '~/stores/root.provider';

interface NewsletterTableProps {
  className?: string;
}

export const NewsletterTable = observer(({ className }: NewsletterTableProps) => {
  const { dashboardStore } = useGlobalStore();
  const store = dashboardStore.emailsStore;

  const isLoading = store.isLoading === true;
  const hasNoData = store.state === null || store.state.length === 0;
  const firstEmailId = store.state?.[0]?.id.toString() ?? '';

  if (isLoading) {
    return (
      <div className={className}>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (hasNoData) {
    return (
      <div className={className}>
        <div className="text-gray-500">Désolé, vous n'avez pas (encore) de newsletters.</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <Accordion type="multiple" defaultValue={[firstEmailId]}>
          {store.state!.map((email: Email) => (
            <div key={email.id} className="m-4">
              <EmailRow email={email} />
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
});

NewsletterTable.displayName = 'NewsletterTable';
