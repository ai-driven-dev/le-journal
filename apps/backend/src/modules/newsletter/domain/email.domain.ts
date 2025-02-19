import { Email, EmailStatus } from '@le-journal/shared-types';

import { ArticleDomain } from './article.domain';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class EmailDomain extends Email {
  @Property('id')
  @Property('id')
  id!: string;

  @Property('subject', "Sujet de l'email")
  subject!: string;

  @Property('content', "Contenu de l'email")
  content!: string;

  @Property('receivedAt', "Date de réception de l'email")
  receivedAt!: Date;

  @Property('status', "Statut de l'email")
  status!: EmailStatus;

  @Property('articles', "Articles associés à l'email")
  articles!: ArticleDomain[];
}
