import { Injectable } from '@nestjs/common';

import { RedisCache } from '../redis.repository';

import { UserModel } from 'src/prisma/prisma.types';

@Injectable()
export class UserCacheRepository extends RedisCache<UserModel> {
  protected readonly keyPrefix = 'cache_user';

  protected getKeyFromData(data: UserModel): string {
    return data.id;
  }
}
