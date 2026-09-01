import { Inject } from '@nestjs/common';
import { RateLimiterPort } from '../domain/ports/rate-limiter.port';
import { REDIS_CLIENT } from '../../redis/redis.constants';
import Redis from 'ioredis';
import { TooManyRequestsException } from 'src/exceptions/too-many-request.exception';

export class RateLimiterService implements RateLimiterPort {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis
  ) {};

  async check(key: string, limit: number, windowSeconds: number): Promise<void> {
    const count = await this.redis.incr(key);
    if(count === 1) {
      await this.redis.expire(key, windowSeconds);
    }

    if(count > limit) {
      throw new TooManyRequestsException('Limit of attemps aceeded. Try again');
    }
  }
}