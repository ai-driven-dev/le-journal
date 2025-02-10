import type { Email } from '@le-journal/shared-types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { ArticleRow } from './articles/article-row.component';

export const EmailRow = observer(({ email }: { email: Email }): JSX.Element => {
  // Computations and transformations at the top
  const hasArticles = email.articles.length > 0;
  const receivedAt = new Date(email.received_at);
  const receivedAtFormatted = receivedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AccordionItem value={email.id.toString()}>
      <AccordionTrigger
        className={`px-4 py-2 rounded-t-lg shadow flex w-full items-center justify-between hover:no-underline ${hasArticles ? 'bg-white' : 'bg-gray-100 cursor-wait'}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${hasArticles ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-gray-200 text-gray-600'}`}
          >
            {receivedAtFormatted}
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
          <div className="space-y-4">
            {email.articles.map((article) => (
              <ArticleRow key={article.id} article={article} />
            ))}
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  );
});

EmailRow.displayName = 'EmailRow';
