import { Injectable } from '@nestjs/common';
import { Newsletter } from '@prisma/client';

import { NewsletterRepository } from '../domain/newsletter.repository';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaNewsletterRepository implements NewsletterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: string): Promise<Newsletter[]> {
    return this.prisma.newsletter.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        subscribed_at: 'asc',
      },
    });
  }
}
