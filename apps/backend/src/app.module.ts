import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';

import { ConfigModule } from './config/config.module';
import { NewsletterModule } from './features/newsletter/newsletter.module';
import { ProjectsModule } from './features/projects/projects.module';
import { UsersModule } from './features/users/users.module';
import { LoggerModule } from './infrastructure/logging/logger.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsersModule,
    ProjectsModule,
    NewsletterModule,
    LoggerModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        store: new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        }),
      }),
    }),
  ],
})
export class AppModule {}
