import { Article } from '@le-journal/shared-types';

import { ApiAuthProperty } from 'src/infrastructure/http/api-data-property.decorator';

export class ArticleDomain extends Article {
  @ApiAuthProperty('id')
  @ApiAuthProperty('id')
  id!: string;

  @ApiAuthProperty('subject', "Sujet ou sujet principal de l'article")
  subject!: string;

  @ApiAuthProperty('description', "Description du contenu de l'article")
  description!: string;

  @ApiAuthProperty('link', "URL vers l'article complet")
  link!: string;

  @ApiAuthProperty('score', 'Relevance score of the article (0-1)')
  @ApiAuthProperty('score', 'Relevance score of the article (0-1)')
  score!: number;

  @ApiAuthProperty('extractedAt', "Date et heure de l'extraction de l'article")
  extractedAt!: Date;
}
