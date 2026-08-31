import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationExceptionFilter } from './application-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionFilter
    }
  ]
})
export class ExceptionsModule {}
