import { Injectable } from '@nestjs/common';
import { Timer } from 'src/common/domain/timing/timer';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class GetMeUseCase {
  constructor(
    private readonly logService: LogsService
  ) {};

  saveLog(user_id: string, user_name: string, duration = 0, err : any = null) {
    if(!err) {
      this.logService.log({
        user_id,
        user_name,
        action: 'GetMe',
        module: 'User',
        resource: 'GetMeUseCase',
        description: 'Get-Me-Information',
        result: 'success',
        message_error: '',
        duration: duration
      });
    } else {
      this.logService.log({
        user_id,
        user_name,
        action: 'GetMe',
        module: 'User',
        resource: 'GetMeUseCase',
        description: 'Get-Me-Information',
        result: 'error',
        message_error: err.message ?? 'unknow',
        duration: duration
      });
    }
  }

  async execute(user: User) {
    const timer = Timer.create();
    const me = user.getGraphQLType();
    this.saveLog(user.getId(), user.getUserName(), timer.stop(), null);
    return me;
  }
}