import { Inject, Injectable } from '@nestjs/common';
import { Timer } from 'src/common/domain/timing/timer';
import { LogsService } from 'src/logs/logs.service';
import { IRolRepository } from 'src/rols/domain/interface/irol.repository';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetAllWithIdNameUseCase {
  constructor(
    @Inject('RolRepository')
    private readonly rolRepository: IRolRepository,
    private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logsService.log({
      user_id,
      user_name,
      action: 'Get All Rols with Id and Name',
      module: 'rols',
      resource: 'GetAllWithIdNameUseCase',
      description: 'Get all rols with id and name',
      result: 'success',
      duration: duration
    }, { ...payload })
  }

  async execute(user: User) {
    const timer = Timer.create();
    const rols = await this.rolRepository.getAllNamesAndIds();
    await this.saveLog(user.id, user.getUserName(), timer.stop(), {});
    return rols;
  }
}