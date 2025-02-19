import { Newsletter, NewsletterStatusType } from '@le-journal/shared-types';

import { ApiAuthProperty } from 'src/infrastructure/http/api-data-property.decorator';

export class NewsletterDomain extends Newsletter {
  @ApiAuthProperty('id')
  id!: string;

  @ApiAuthProperty('email')
  email!: string;

  @ApiAuthProperty('subscribedAt', 'Date de souscription')
  subscribedAt!: Date;

  @ApiAuthProperty('subscriptionStatus', 'Statut de la souscription')
  subscriptionStatus!: NewsletterStatusType;
}
