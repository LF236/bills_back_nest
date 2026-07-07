import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogRepositoryImpl } from './infrastructure/orm/typeorm/log.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogOrmEntity } from './infrastructure/orm/typeorm/log.orm.entity';
import { RequestContextFactory } from './infrastructure/context/request-context.factory';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [
    {
      provide: 'LogRepository',
      useClass: LogRepositoryImpl
    },
    LogsService,
    RequestContextFactory,
  ],
  imports: [
    TypeOrmModule.forFeature([ LogOrmEntity ]),
    CommonModule
  ],
  exports: [
    LogsService
  ]
})
export class LogsModule {}
