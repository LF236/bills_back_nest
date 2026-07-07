import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogRepositoryPort } from 'src/logs/domain/ports/log-repository.port';
import { LogOrmEntity } from './log.orm.entity';
import { Repository } from 'typeorm';
import { LogEntity } from 'src/logs/domain/entities/LogEntity';
import { CreateLogDto } from 'src/logs/application/dtos/create-log.dto';
@Injectable()
export class LogRepositoryImpl implements LogRepositoryPort {
  constructor(
    @InjectRepository(LogOrmEntity)
    private readonly repo: Repository<LogOrmEntity>
  ) {};

  findById(id: string): Promise<LogEntity | null> {
    throw new Error('Method not implemented.');
  }

  async saveLog(dto: CreateLogDto, addionalData: any): Promise<LogEntity> {
    let log = this.repo.create({
      user_id: dto.user_id,
      user_name: dto.user_name,
      action: dto.action,
      module: dto.module,
      resource: dto.resource,
      description: dto.description,
      result: dto.result,
      message_error: dto.message_error ?? null,
      ip: addionalData.ip ?? null,
      user_agent: addionalData.user_agent ?? null,
      method_http: addionalData.method_http ?? null,
      route: addionalData.route ?? null,
      request_id: addionalData.request_id ?? null,
      duration: dto.duration ?? null
    });

    log = await this.repo.save(log);
    return LogEntity.createFromObj(log);
  }
}