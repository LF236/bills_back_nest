import { Global, Module } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (config: ConfigService) => 
        new Redis({
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379)
        }),
        inject: [ ConfigService ]
    }
  ],
  exports: [ REDIS_CLIENT ]
})
export class RedisModule {}