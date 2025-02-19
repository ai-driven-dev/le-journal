import { Newsletter, NewsletterStatusType } from '@le-journal/shared-types';

import { Property } from 'src/infrastructure/http/api-domain-property.decorator';

export class NewsletterDomain extends Newsletter {
  @Property('id')
  id!: string;

  @Property('email')
  email!: string;

  @Property('subscribedAt', 'Date de souscription')
  subscribedAt!: Date;

  @Property('subscriptionStatus', 'Statut de la souscription')
  subscriptionStatus!: NewsletterStatusType;
}
