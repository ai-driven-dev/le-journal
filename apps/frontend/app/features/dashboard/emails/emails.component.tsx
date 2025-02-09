import type { Article, Email } from '@le-journal/shared-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { useDashboardStores } from '../dashboard.context';

import { Skeleton } from '~/components/ui/skeleton';

const NewsletterAccordionItem = observer(({ email }: { email: Email }): JSX.Element => {
  const hasArticles = email.articles.length > 0;

  return (
    <AccordionItem value={email.id.toString()}>
      <AccordionTrigger
        className={`px-4 py-2 rounded-t-lg shadow flex w-full items-center justify-between hover:no-underline ${hasArticles ? 'bg-white' : 'bg-gray-100 cursor-wait'}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${hasArticles ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-gray-200 text-gray-600'}`}
          >
            {/* {email.received_at.toLocaleDateString()} */}
          </div>
          <h3 className={`text-lg font-semibold ${hasArticles ? '' : 'text-gray-500'}`}>
            {email.subject}
          </h3>
        </div>
        {hasArticles && (
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        )}
      </AccordionTrigger>
      {hasArticles && (
        <AccordionContent className="bg-white px-4 pb-4 rounded-b-lg shadow">
          <div className="space-y-2">
            {email.articles.map((article: Article) => (
              <div key={article.id} className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{article.subject}</h4>
                  <span className="text-sm text-gray-500">Score: {article.score}</span>
                </div>
                <p className="text-sm text-gray-600">{article.description}</p>
                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    Read more
                  </a>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  );
});

interface NewsletterTableProps {
  className?: string;
}

export const NewsletterTable = observer(({ className }: NewsletterTableProps) => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.emailsStore;

  if (store.isLoading === true) {
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

  if (store.error !== null) {
    return (
      <div className={className}>
        <div className="text-red-500">Error: {store.error}</div>
      </div>
    );
  }

  if (store.data === null || store.data.length === 0) {
    return (
      <div className={className}>
        <div className="text-gray-500">No newsletters found</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <Accordion
          type="multiple"
          defaultValue={store.data
            .filter((email: Email) => email.articles.length > 0)
            .map((email: Email) => email.id.toString())}
        >
          {store.data.map((email: Email) => (
            <NewsletterAccordionItem key={email.id} email={email} />
          ))}
        </Accordion>
      </div>
    </div>
  );
});

NewsletterTable.displayName = 'NewsletterTable';
