import type { Article } from '@le-journal/shared-types';
import { observer } from 'mobx-react-lite';

import { Badge } from '~/components/ui/badge';

interface ArticleRowProps {
  article: Article;
}

export const ArticleRow = observer(({ article }: ArticleRowProps): JSX.Element => {
  const score = article.score.toFixed(2);

  return (
    <div className="border-t pt-2">
      <div className="flex justify-between items-center">
        {article.link ? (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 flex items-center gap-2 underline"
          >
            <h4 className="font-medium">{article.subject}</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <h4 className="font-medium">{article.subject}</h4>
        )}
        <Badge variant="secondary">{score}</Badge>
      </div>

      <p className="text-sm text-gray-600">{article.description}</p>
    </div>
  );
});

ArticleRow.displayName = 'ArticleRow';
