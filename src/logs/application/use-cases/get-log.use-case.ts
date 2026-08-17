import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Timer } from 'src/common/domain/timing/timer';
import { LogEntity } from 'src/logs/domain/entities/LogEntity';
import { LogRepositoryPort } from 'src/logs/domain/ports/log-repository.port';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetLogUseCase {
  constructor(
    @Inject('LogRepository')
    private readonly logsRepository: LogRepositoryPort,
    private readonly logService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logService.log({
      user_id,
      user_name,
      action: 'Get Log',
      module: 'logs',
      resource: 'GetLogUseCase',
      description: 'Get Log',
      result: 'success',
      duration: duration
    }, { ...payload });
  }

  async execute(id: string, user: User) : Promise<LogEntity> {
    const timer = Timer.create();
    const item = await this.logsRepository.findById(id);
    if(!item) {
      throw new BadRequestException('Item with id ' + id + ' not found');
    }
    
    await this.saveLog(user.id, user.getUserName(), timer.stop(), { id });
    return item;
  }
}