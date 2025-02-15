import { Injectable } from '@nestjs/common';

import { AppLogger } from '../logger/logger.service';

import { RedisService } from './redis.service';
import { DEFAULT_CACHE_EXPIRATION, RedisCacheOptions } from './redis.types';

export interface RedisCacheInterface<T> {
  set(data: T, options?: RedisCacheOptions): Promise<void>;
  get(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
}

@Injectable()
export abstract class RedisCache<T> implements RedisCacheInterface<T> {
  protected abstract readonly keyPrefix: string;

  constructor(
    private readonly logger: AppLogger,
    protected readonly redisService: RedisService,
  ) {}

  protected getFullKey(key: string): string {
    return `${this.keyPrefix}:${key}`;
  }

  async set(data: T, options?: RedisCacheOptions): Promise<void> {
    const expiresIn = options?.expiresIn ?? DEFAULT_CACHE_EXPIRATION;
    const key = this.getFullKey(this.getKeyFromData(data));

    this.logger.debug('set', {
      service: this.constructor.name,
      method: 'set',
      metadata: { key, data, expiresIn },
    });

    await this.redisService.setData(key, data, expiresIn);
  }

  async get(key: string): Promise<T | null> {
    const data = await this.redisService.get(this.getFullKey(key));
    return data ? JSON.parse(data) : null;
  }

  async invalidate(key: string): Promise<void> {
    await this.redisService.invalidate(this.getFullKey(key));
  }

  protected abstract getKeyFromData(data: T): string;
}
