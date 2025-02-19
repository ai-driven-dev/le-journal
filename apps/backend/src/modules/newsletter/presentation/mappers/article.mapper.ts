import { Article } from '@le-journal/shared-types';
import { Injectable } from '@nestjs/common';

import { ArticleDomain } from '../../domain/article.domain';

import { Mapper } from 'src/presentation/mapper.interface';
import { ArticleModel } from 'src/prisma/prisma.types';

@Injectable()
export class ArticleMapper implements Mapper<ArticleDomain, ArticleModel> {
  toDomain(model: ArticleModel): ArticleDomain {
    return {
      id: model.id,
      subject: model.title,
      description: model.description,
      link: model.url,
      score: model.relevance_score,
      extractedAt: model.extracted_at,
    };
  }

  toModel(domain: ArticleDomain): ArticleModel {
    return {
      id: domain.id,
      title: domain.subject,
      description: domain.description,
      url: domain.link,
      relevance_score: domain.score,
      extracted_at: domain.extractedAt,
    };
  }

  toDTO(domain: ArticleDomain): Article {
    return {
      id: domain.id,
      subject: domain.subject,
      description: domain.description,
      link: domain.link,
      score: domain.score,
      extractedAt: domain.extractedAt,
    };
  }
}
