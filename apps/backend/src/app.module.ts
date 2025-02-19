import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import { Redis } from 'ioredis';

import { ConfigModule } from './config/config.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { SeedsModule } from './infrastructure/database/seeds.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsersModule,
    ProjectsModule,
    NewsletterModule,
    AuthModule,
    LoggerModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        store: new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        }),
      }),
    }),
    SeedsModule,
  ],
  providers: [
    {
      provide: Logger,
      useClass: Logger,
    },
  ],
})
export class AppModule {}
