import { Article } from '@le-journal/shared-types';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class ArticleDomain extends Article {
  @Property('id')
  @Property('id')
  id!: string;

  @Property('subject', "Sujet ou sujet principal de l'article")
  subject!: string;

  @Property('description', "Description du contenu de l'article")
  description!: string;

  @Property('link', "URL vers l'article complet")
  link!: string;

  @Property('score', 'Relevance score of the article (0-1)')
  @Property('score', 'Relevance score of the article (0-1)')
  score!: number;

  @Property('extractedAt', "Date et heure de l'extraction de l'article")
  extractedAt!: Date;
}
