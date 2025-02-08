import { Inject, Injectable } from '@nestjs/common';
import { Email } from '@prisma/client';

import {
  EMAIL_REPOSITORY,
  EmailRepository,
} from '../../domain/repositories/email.repository.interface';

@Injectable()
export class GetEmailsUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(userId: string): Promise<Email[]> {
    return this.emailRepository.findByUserId(userId);
  }
}
