import { Inject, Injectable } from '@nestjs/common';
import { PaginationArgs } from 'src/common/application/dto/args/pagination.args';
import { SearchArgs } from 'src/common/application/dto/args/search.args';
import { Timer } from 'src/common/domain/timing/timer';
import { LogEntity } from 'src/logs/domain/entities/LogEntity';
import { LogRepositoryPort } from 'src/logs/domain/ports/log-repository.port';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';
import { GetLogsFiltersArgs } from '../dtos/args/get-logs-filters.args';

@Injectable()
export class GetLogsUseCase {
  constructor(
    @Inject('LogRepository')
    private readonly logsRepository: LogRepositoryPort,
    private readonly logService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logService.log({
      user_id,
      user_name,
      action: 'Get Logs',
      module: 'logs',
      resource: 'GetLogsUseCase',
      description: 'Get logs',
      result: 'success',
      duration: duration,
    }, {
      ...payload
    })
  }

  async execute(paginationDto: PaginationArgs, searchDto: SearchArgs, aditionalFilters: GetLogsFiltersArgs, user: User) : Promise<{items: LogEntity[], total: number}> {
    const time = Timer.create();
    const data = await this.logsRepository.findAll(paginationDto, searchDto, aditionalFilters);
    const count = await this.logsRepository.count(searchDto, aditionalFilters);
    await this.saveLog(user.id, user.getUserName(), time.stop(), { paginationDto, searchDto });
    return {
      items: data,
      total: count
    }
  }
}