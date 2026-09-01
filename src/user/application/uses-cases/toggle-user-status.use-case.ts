import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ToggleUserStatusInput } from '../dto/toggle-user-status.input';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { LogsService } from 'src/logs/logs.service';
import { Timer } from 'src/common/domain/timing/timer';

@Injectable()
export class ToggleUserStatusUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly logsService: LogsService
  ) {};

  async saveLog(duration = 0, metadata: any = {}, user_id?: string | null, user_name?: string | null) {
    await this.logsService.log({
      user_id: user_id ?? null,
      user_name: user_name ?? 'guest_user',
      action: 'Toggle User Status',
      module: 'User',
      resource: 'ToggleUserStatusUseCase',
      description: 'toggle-user-status',
      result: 'success',
      message_error: '',
      duration: duration
    }, { ...metadata })
  }

  async execute(data: ToggleUserStatusInput, user: User) {
    const timer = Timer.create();
    const exits = await this.userRepository.findById(data.id);
    if(!exits) {
      throw new NotFoundException('User with id ' + data.id + ' does not exists' );
    }
    const togledUser = await this.userRepository.toggleUserStatus(data.id, data.status);
    await this.saveLog(timer.stop(), data, user?.id, user?.getUserName());
    return togledUser.getGraphQLType();
  }
}