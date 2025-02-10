import type { Email } from '@le-journal/shared-types';
import { Accordion } from '@radix-ui/react-accordion';
import { observer } from 'mobx-react-lite';

import { useDashboardStores } from '../dashboard.context';

import { EmailRow } from './email-row.component';

import { Skeleton } from '~/components/ui/skeleton';

interface NewsletterTableProps {
  className?: string;
}

export const NewsletterTable = observer(({ className }: NewsletterTableProps) => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.emailsStore;

  const isLoading = store.isLoading === true;
  const hasError = store.error !== null;
  const hasNoData = store.data === null || store.data.length === 0;
  const defaultAccordionValues = store.data
    ?.filter((email: Email) => email.articles.length > 0)
    .map((email: Email) => email.id.toString());

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

  if (hasError) {
    return (
      <div className={className}>
        <div className="text-red-500">Error: {store.error}</div>
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
        <Accordion type="multiple" defaultValue={defaultAccordionValues}>
          {store.data!.map((email: Email) => (
            <EmailRow key={email.id} email={email} />
          ))}
        </Accordion>
      </div>
    </div>
  );
});

NewsletterTable.displayName = 'NewsletterTable';
