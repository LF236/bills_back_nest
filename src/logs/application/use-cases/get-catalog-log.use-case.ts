import { Inject, Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { GetCatalogLogsArgs } from '../dtos/args/get-catalogs-log.args';
import { User } from 'src/user/domain/entities/user.entity';
import { LogRepositoryPort } from 'src/logs/domain/ports/log-repository.port';
import { Timer } from 'src/common/domain/timing/timer';

@Injectable()
export class GetCatalogLogUseCase {
  constructor(
    @Inject('LogRepository')
    private readonly logsRepository: LogRepositoryPort,
    private readonly logService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logService.log({
      user_id,
      user_name,
      action: 'Get Catalog',
      module: 'logs',
      resource: 'GetCatalogLogUseCase',
      description: 'Admin Get Catalog Of Logs',
      result: 'success',
      duration: duration
    }, {
      ...payload
    });
  }

  async execute(catalogArgs: GetCatalogLogsArgs, user: User) {
    const time = Timer.create();
    const data = await this.logsRepository.getCatalog(catalogArgs.type);
    await this.saveLog(user.id, user.getUserName(), time.stop(), { ...catalogArgs });
    return {
      values: data
    };
  }
}