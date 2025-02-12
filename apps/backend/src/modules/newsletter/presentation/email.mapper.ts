import { EmailStatus } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

import { ArticleModel, EmailModel } from '../../../prisma/prisma.types';
import { EmailDomain } from '../domain/email.domain';

import { ArticleMapper } from './article.mapper';

import { Mapper } from 'src/presentation/mapper.interface';

@Injectable()
export class EmailMapper implements Mapper<EmailDomain, EmailModel> {
  constructor(private readonly articleMapper: ArticleMapper) {}

  toDomain(model: EmailModel): EmailDomain {
    let status: EmailStatus | null = null;

    switch (model.status) {
      case EmailStatus.RECEIVED:
        status = EmailStatus.RECEIVED;
        break;
      case EmailStatus.PROCESSED:
        status = EmailStatus.PROCESSED;
        break;
      case EmailStatus.FAILED:
        status = EmailStatus.FAILED;
        break;
      default:
        throw new Error(`Invalid email status: ${model.status}`);
    }

    return {
      id: model.id,
      subject: model.subject,
      content: model.raw_content,
      receivedAt: model.received_at,
      articles: [], // todo fill
      status: status,
    };
  }

  toModel(domain: EmailDomain): EmailModel & { articles: ArticleModel[] } {
    const emailModel: EmailModel = {
      id: domain.id,
      subject: domain.subject,
      status: domain.status,
      raw_content: domain.content,
      received_at: domain.receivedAt,
    };

    return {
      ...emailModel,
      articles: domain.articles.map((article) => this.articleMapper.toModel(article)),
    };
  }
}
