import type { REFRESH_TOKEN_KEY } from '../auth/auth.types';

export type RedisKey = typeof REFRESH_TOKEN_KEY;

export type RedisData = RedisUserRefreshTokenKey;

export type RedisUserRefreshTokenKey = {
  userId: string;
  refreshToken: string;
};

export interface RedisCacheOptions {
  expiresIn?: number;
}

export const DEFAULT_CACHE_EXPIRATION = 3600; // 1 heure par défaut
