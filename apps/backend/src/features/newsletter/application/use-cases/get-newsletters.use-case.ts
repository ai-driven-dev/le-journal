import { Injectable } from '@nestjs/common';
import { Newsletter } from '@prisma/client';

import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class GetNewslettersUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string): Promise<Newsletter[]> {
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
