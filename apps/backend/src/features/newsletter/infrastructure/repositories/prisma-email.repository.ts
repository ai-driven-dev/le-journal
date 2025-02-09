import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';
import {
  EmailRepository,
  EmailWithArticles,
} from '../../domain/repositories/email.repository.interface';

@Injectable()
export class PrismaEmailRepository implements EmailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProjectId(projectId: string): Promise<EmailWithArticles[]> {
    return this.prisma.email.findMany({
      where: {
        project: {
          id: projectId,
        },
      },
      include: {
        articles: true,
      },
      orderBy: { received_at: 'desc' },
    });
  }

  async searchByUserIdAndTerm(userId: string, searchTerm: string): Promise<EmailWithArticles[]> {
    return this.prisma.email.findMany({
      where: {
        project: {
          user_id: userId,
        },
        OR: [{ subject: { contains: searchTerm, mode: 'insensitive' } }],
      },
      include: {
        articles: true,
      },
      orderBy: { received_at: 'desc' },
    });
  }
}
