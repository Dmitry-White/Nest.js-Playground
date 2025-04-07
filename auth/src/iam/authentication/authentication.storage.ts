import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  ForbiddenException,
} from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

import { CACHE_CONFIG } from './authentication.constants';

@Injectable()
export class AuthenticationStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;
  private cacheConfig: RedisOptions;

  constructor(private readonly configService: ConfigService) {
    this.cacheConfig = this.configService.get(CACHE_CONFIG, {});
  }

  onApplicationBootstrap() {
    this.redisClient = new Redis(this.cacheConfig);
  }

  onApplicationShutdown() {
    return this.redisClient.quit();
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    const key = this.getKey(userId);

    await this.redisClient.set(key, tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const key = this.getKey(userId);

    const storedId = await this.redisClient.get(key);
    if (storedId !== tokenId) {
      throw new ForbiddenException();
    }

    return storedId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    const key = this.getKey(userId);

    await this.redisClient.del(key);
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
