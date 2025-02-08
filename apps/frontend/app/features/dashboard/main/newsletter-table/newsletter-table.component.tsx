import type { Article, Newsletter } from '@le-journal/shared-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { useDashboardStores } from '../../dashboard.context';

interface NewsletterAccordionItemProps {
  newsletter: Newsletter;
}

const NewsletterAccordionItem = observer(
  ({ newsletter }: NewsletterAccordionItemProps): JSX.Element => {
    const hasArticles = newsletter.articles.length > 0;

    return (
      <AccordionItem value={newsletter.id.toString()}>
        <AccordionTrigger
          className={`px-4 py-2 rounded-t-lg shadow flex w-full items-center justify-between hover:no-underline ${hasArticles ? 'bg-white' : 'bg-gray-100 cursor-wait'}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${hasArticles ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-gray-200 text-gray-600'}`}
            >
              {newsletter.date}
            </div>
            <h3 className={`text-lg font-semibold ${hasArticles ? '' : 'text-gray-500'}`}>
              {newsletter.title}
            </h3>
          </div>
          {hasArticles && (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          )}
        </AccordionTrigger>
        {hasArticles && (
          <AccordionContent className="bg-white px-4 pb-4 rounded-b-lg shadow">
            <div className="space-y-2">
              {newsletter.articles.map((article: Article, index: number) => (
                <div key={index} className="border-t pt-2">
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
  },
);

export const NewsletterTable = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.newsletterTable;

  return (
    <div className="w-full">
      <div className="space-y-4">
        <Accordion
          type="multiple"
          defaultValue={store.newsletters
            .filter((n) => n.articles.length > 0)
            .map((n) => n.id.toString())}
        >
          {store.newsletters.map((newsletter: Newsletter) => (
            <NewsletterAccordionItem key={newsletter.id} newsletter={newsletter} />
          ))}
        </Accordion>
      </div>
    </div>
  );
});
