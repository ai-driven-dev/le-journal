import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';
import { RefreshTokenCacheRepository } from './repositories/user-token.repository';
import { UserCacheRepository } from './repositories/user.repository';

@Module({
  providers: [RedisService, UserCacheRepository, RefreshTokenCacheRepository],
  exports: [UserCacheRepository, RefreshTokenCacheRepository],
})
export class RedisModule {}
