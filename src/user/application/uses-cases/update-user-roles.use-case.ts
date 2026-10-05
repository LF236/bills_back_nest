import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { UpdateUserRolesInput } from '../dto/update-user-roles.input';
import { Timer } from 'src/common/domain/timing/timer';
import { IRolRepository } from 'src/rols/domain/interface/irol.repository';

@Injectable()
export class UpdateUserRolesUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('RolRepository')
    private readonly rolsRepository: IRolRepository,
    private readonly logsService: LogsService
  ) {};

  
  async saveLog(user_id: string, user_name: string, duration = 0, payload: any) {
    await this.logsService.log({
      user_id,
      user_name,
      action: 'Update User Roles',
      module: 'User',
      resource: 'UpdateUserRolesUseCase',
      description: 'Updte roles of one user',
      result: 'success',
      message_error: '',
      duration: duration
    }, { ...payload })
  }

  async execute(updateRolesInput: UpdateUserRolesInput, user: User) {
    const timer = Timer.create();
    const {userId, rolesIds} = updateRolesInput;
    
    const userToUpdate = await this.userRepository.findById(userId);
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.rolsRepository.findByIds(rolesIds);
    const rolesNotFound = rolesIds.filter(id => !roles.some(role => role.getId() === id));
    if (rolesNotFound.length > 0) {
      throw new NotFoundException(`Roles not found: ${rolesNotFound.join(', ')}`);
    }

    const userUpdated = await this.userRepository.updateRoles(userId, rolesIds);
    
    await this.saveLog(user.getId(), user.getUserName(), timer.stop(), { userId, rolesIds });
    return userUpdated;
  }
}