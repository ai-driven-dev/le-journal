import { Injectable } from '@nestjs/common';

import { Mapper } from '../../../presentation/mapper.interface';
import { NewsletterDomain } from '../domain/newsletter.domain';

import { NewsletterModel } from 'src/prisma/prisma.types';

@Injectable()
export class NewsletterMapper implements Mapper<NewsletterDomain, NewsletterModel> {
  toModel(domain: NewsletterDomain): NewsletterModel {
    return {
      id: domain.id,
      email: domain.email,
      subscribed_at: domain.subscribedAt,
      subscription_status: domain.subscriptionStatus,
    };
  }

  toDomain(model: NewsletterModel): NewsletterDomain {
    return {
      id: model.id,
      email: model.email,
      subscribedAt: model.subscribed_at,
      subscriptionStatus: model.subscription_status,
    };
  }
}
