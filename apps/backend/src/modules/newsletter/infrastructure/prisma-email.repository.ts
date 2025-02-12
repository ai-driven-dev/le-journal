import { Injectable } from '@nestjs/common';

import { EmailModel } from '../../../prisma/prisma.types';
import { EmailRepository } from '../domain/email.repository.interface';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaEmailRepository implements EmailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProjectId(projectId: string): Promise<EmailModel[]> {
    return this.prisma.email.findMany({
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
  }
}
