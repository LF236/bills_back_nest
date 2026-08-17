import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogRepositoryPort } from 'src/logs/domain/ports/log-repository.port';
import { LogOrmEntity } from './log.orm.entity';
import { Repository } from 'typeorm';
import { LogEntity } from 'src/logs/domain/entities/LogEntity';
import { CreateLogDto } from 'src/logs/application/dtos/create-log.dto';
import { PaginationArgs } from 'src/common/application/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { User } from 'src/user/domain/entities/user.entity';
import { GetLogsFiltersArgs } from 'src/logs/application/dtos/args/get-logs-filters.args';
@Injectable()
export class LogRepositoryImpl implements LogRepositoryPort {
  constructor(
    @InjectRepository(LogOrmEntity)
    private readonly repo: Repository<LogOrmEntity>
  ) {};

  async findById(id: string): Promise<LogEntity | null> {
    const query = await this.repo.createQueryBuilder('logs')
      .leftJoinAndSelect('logs.user', 'user')
      .where('logs.id = :id', { id })
      .getOne();

    if(!query) return null;

    const logEntity = LogEntity.createFromObj(query);
    if(query.user) {
      const userEntity = User.createFromObj(query.user);
      logEntity.setUser(userEntity);
    }

    return logEntity;
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
      duration: dto.duration ?? null,
      browser: addionalData.browser ?? null,
      browser_version: addionalData.browser_version ?? null,
      os: addionalData.os ?? null,
      device: addionalData.device ?? null,
      metadata: addionalData.metadata ?? {}
    });

    log = await this.repo.save(log);
    return LogEntity.createFromObj(log);
  }

  async findAll(paginationDto: PaginationArgs, searchArgs: SearchArgs, aditionalFilters: GetLogsFiltersArgs): Promise<LogEntity[]> {
    let { limit, offset, paginate } = paginationDto;
    limit = limit ?? 10;
    offset = offset ?? 0;
    paginate = paginate ?? true;

    const query = this.repo.createQueryBuilder('logs')
      .leftJoinAndSelect('logs.user', 'user');
    
    if(paginate) {
      query
        .take(limit)
        .offset(offset);
    }

    if(searchArgs.search) {
      query.andWhere('(logs.description) ILIKE :search OR (user.name) ILIKE :search', { search: `%${searchArgs.search}%` });
    }

    if(aditionalFilters.action) {
      query.andWhere('(logs.action) ILIKE :action', { action: `${aditionalFilters.action}` });
    }

    if(aditionalFilters.module) {
      query.andWhere('(logs.module) ILIKE :module', { module: `${aditionalFilters.module}` });
    }

    query.orderBy('logs.created_at', 'DESC');

    const data = await query.getMany();
    
    if(data && data.length > 0) {
      const logsEntities = data.map(log => {
        const logEntity = LogEntity.createFromObj(log);
        if(log.user) {
          let userEntity = User.createFromObj(log.user);
          logEntity.setUser(userEntity);
        }

        return logEntity;
      });

      return logsEntities;
    }
    
    return [];
  }

  async count(searchArgs: SearchArgs, aditionalFilters: GetLogsFiltersArgs) : Promise<number> {
    const { search } = searchArgs;
    const query = this.repo.createQueryBuilder('logs')
      .select('COUNT(logs.id)', 'count')
      .leftJoin('logs.user', 'user');

    if(search) {
      query.andWhere('(logs.description) ILIKE :search OR (user.name) ILIKE :search', { search: `%${search}%` });
    }
    
    if(aditionalFilters.module) {
      query.andWhere('(logs.module) ILIKE :module', { module: `%${aditionalFilters.module}` });
    }

    if(aditionalFilters.action) {
      query.andWhere('(logs.action) ILIKE :action', { action: `${aditionalFilters.action}` });
    }

    const result = await query.getRawOne();
    return parseInt(result.count, 10);
  }

  async getCatalog(type: string): Promise<String[]> {
    const query = this.repo.createQueryBuilder('logs')
      .select(`DISTINCT logs.${type}`, type)
      .where(`logs.${type} IS NOT NULL`)
      .orderBy(`logs.${type}`, 'ASC');
    const result = await query.getRawMany();
    return result.map(item => item[type]);
  }
}