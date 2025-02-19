import { Email, EmailStatus } from '@le-journal/shared-types';

import { ArticleDomain } from './article.domain';

import { ApiAuthProperty } from 'src/infrastructure/http/api-data-property.decorator';

export class EmailDomain extends Email {
  @ApiAuthProperty('id')
  @ApiAuthProperty('id')
  id!: string;

  @ApiAuthProperty('subject', "Sujet de l'email")
  subject!: string;

  @ApiAuthProperty('content', "Contenu de l'email")
  content!: string;

  @ApiAuthProperty('receivedAt', "Date de réception de l'email")
  receivedAt!: Date;

  @ApiAuthProperty('status', "Statut de l'email")
  status!: EmailStatus;

  @ApiAuthProperty('articles', "Articles associés à l'email")
  articles!: ArticleDomain[];
}
