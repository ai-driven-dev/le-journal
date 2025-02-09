import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  EMAIL_REPOSITORY,
  EmailRepository,
} from '../../domain/repositories/email.repository.interface';

type EmailWithArticles = Prisma.EmailGetPayload<{
  include: { articles: true };
}>;

@Injectable()
export class SearchEmailsUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(userId: string, searchTerm: string): Promise<EmailWithArticles[]> {
    return this.emailRepository.searchByUserIdAndTerm(userId, searchTerm);
  }
}
