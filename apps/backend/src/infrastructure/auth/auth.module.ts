import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { ThrottlerGuard } from '@nestjs/throttler';

import { RedisModule } from '../redis/redis.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategyFull } from './strategies/google-full.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from 'src/modules/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    RedisModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    // En production, on applique les limites, en dev on n'applique rien
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000, // 1 minute
    //     limit: 50, // 50 requests per minute
    //   },
    // ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategyFull,
    JwtStrategy,
    // Le guard global qui applique partout la limite
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
  exports: [AuthService],
})
export class AuthModule {}
