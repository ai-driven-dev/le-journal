import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import { Redis } from 'ioredis';

import { ConfigModule } from './config/config.module';
import { FiltersModule } from './infrastructure/filters/filters.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
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
    FiltersModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        store: new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        }),
      }),
    }),
  ],
  providers: [
    {
      provide: Logger,
      useClass: Logger,
    },
  ],
})
export class AppModule {}
