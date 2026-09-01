import { Module } from '@nestjs/common';
import { RATE_LIMITER } from './infrastructure/constants/rate-limiter.constants';
import { RateLimiterService } from './infrastructure/rate-limiter.service';

@Module({
  providers: [
    {
      provide: RATE_LIMITER,
      useClass: RateLimiterService
    }
  ],
  exports: [ RATE_LIMITER ]
})
export class RateLimiterModule {}