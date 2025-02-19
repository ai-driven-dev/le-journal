import { Injectable } from '@nestjs/common';

import { EmailDomain } from '../domain/email.domain';
import { EmailRepository } from '../domain/email.repository.interface';
import { EmailMapper } from '../presentation/mappers/email.mapper';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaEmailRepository implements EmailRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailMapper: EmailMapper,
  ) {}

  async findAllByProjectId(projectId: string): Promise<EmailDomain[]> {
    const emails = await this.prisma.email.findMany({
      where: {
        newsletter: {
          project_id: projectId,
        },
      },
      include: {
        articles: true,
      },
      orderBy: { received_at: 'desc' },
    });

    return emails.map((email) => this.emailMapper.toDomain(email));
  }
}
