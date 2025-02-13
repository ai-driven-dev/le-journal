import type { Article } from '@le-journal/shared-types';
import { LinkIcon } from 'lucide-react';
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
            <LinkIcon />
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
