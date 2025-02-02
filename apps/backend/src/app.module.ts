import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './features/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Redis } from 'ioredis';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsersModule,
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
