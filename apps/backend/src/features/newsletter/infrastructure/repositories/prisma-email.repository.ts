import { Injectable } from '@nestjs/common';
import { Email } from '@prisma/client';

import { PrismaService } from '../../../../prisma/prisma.service';
import { EmailRepository } from '../../domain/repositories/email.repository.interface';

@Injectable()
export class PrismaEmailRepository implements EmailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Email[]> {
    return this.prisma.email.findMany({
      where: {
        newsletter: {
          user_id: userId,
        },
      },
      orderBy: { received_at: 'desc' },
    });
  }

  async searchByUserIdAndTerm(userId: string, searchTerm: string): Promise<Email[]> {
    return this.prisma.email.findMany({
      where: {
        newsletter: {
          user_id: userId,
        },
        OR: [{ subject: { contains: searchTerm, mode: 'insensitive' } }],
      },
      orderBy: { received_at: 'desc' },
    });
  }
}
