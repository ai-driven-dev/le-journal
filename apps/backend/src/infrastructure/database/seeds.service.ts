import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { UsersSeedService } from './seeds/users.seed.service';

@Injectable()
export class SeedsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersSeedService: UsersSeedService,
  ) {}

  async seedAll(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      await this.prisma.$transaction(async (tx) => {
        await this.usersSeedService.seed(tx);
      });

      console.log('✅ Database seeding completed');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}
