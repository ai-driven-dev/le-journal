import type { Article } from '@le-journal/shared-types';
import { observer } from 'mobx-react-lite';

interface ArticleRowProps {
  article: Article;
}

export const ArticleRow = observer(({ article }: ArticleRowProps): JSX.Element => {
  return (
    <div className="border-t pt-2">
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
  );
});

ArticleRow.displayName = 'ArticleRow';
