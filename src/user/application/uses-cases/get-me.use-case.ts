import { Injectable } from '@nestjs/common';
import { Timer } from 'src/common/domain/timing/timer';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetMeUseCase {
  constructor(
    private readonly logService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration = 0) {
    await this.logService.log({
      user_id,
      user_name,
      action: 'GetMe',
      module: 'User',
      resource: 'GetMeUseCase',
      description: 'Get-Me-Information',
      result: 'success',
      message_error: '',
      duration: duration
    }, {});
  }

  async execute(user: User) {
    const timer = Timer.create();
    const me = user.getGraphQLType();
    await this.saveLog(user.getId(), user.getUserName(), timer.stop());
    return me;
  }
}