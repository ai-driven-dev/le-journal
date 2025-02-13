import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { SeedCommand } from './seeds.command';
import { SeedsService } from './seeds.service';
import { UsersSeedService } from './seeds/users.seed.service';

@Module({
  imports: [PrismaModule],
  providers: [SeedCommand, SeedsService, UsersSeedService],
  exports: [SeedsService],
})
export class SeedsModule {}
