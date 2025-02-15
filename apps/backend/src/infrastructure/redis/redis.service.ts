import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { getEnv } from 'src/main.env';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor() {
    const redisUrl = getEnv('REDIS_URL');
    this.redis = new Redis(redisUrl);
  }

  async setData(key: string, data: unknown, expiresIn: number): Promise<void> {
    const dataString = JSON.stringify(data);
    await this.redis.set(key, dataString, 'EX', expiresIn);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async invalidate(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
