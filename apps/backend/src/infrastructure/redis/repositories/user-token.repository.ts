import { Injectable } from '@nestjs/common';

import { REFRESH_TOKEN_EXPIRATION_TIME } from '../../auth/auth.types';
import { RedisCache } from '../redis.repository';

interface RefreshTokenData {
  userId: string;
  refreshToken: string;
}

@Injectable()
export class RefreshTokenCacheRepository extends RedisCache<RefreshTokenData> {
  protected readonly keyPrefix = 'auth:refresh_token';

  protected getKeyFromData(data: RefreshTokenData): string {
    return data.userId;
  }

  async set(data: RefreshTokenData): Promise<void> {
    if (data.userId.length === 0) {
      throw new Error('User ID is empty');
    }

    if (data.refreshToken.length === 0) {
      throw new Error('Token is empty');
    }

    await super.set(data, { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME });
  }
}
