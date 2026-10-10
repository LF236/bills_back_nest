import { Inject, Injectable } from '@nestjs/common';
import { AdminCreateUserInput } from '../dto/admin-create-user.input';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { IRolRepository } from 'src/rols/domain/interface/irol.repository';
import { ApplicationException } from 'src/exceptions/application.exception';
import { FileRepositoryPort } from 'src/files/domain/ports/file-repository.port';
import { PersonRepositoryPort } from 'src/person/domain/ports/person-repository.port';
import { FileEntity } from 'src/files/domain/entities/file.entity';
import { LogsService } from 'src/logs/logs.service';
import { Timer } from 'src/common/domain/timing/timer';

@Injectable()
export class AdminCreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('RolRepository')
    private readonly rolRepository: IRolRepository,
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort,
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryPort,
    private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logsService.log({
      user_id,
      user_name,
      action: 'Create Admin User',
      module: 'user',
      resource: 'AdminCreateUserUseCase',
      description: 'Admin Create User',
      result: 'success',
      duration: duration
    }, { ...payload });
  }

  async execute(data: AdminCreateUserInput, user: User) {
    const timer = Timer.create();
    const exits = await this.userRepository.findByEmail(data.email);

    if(exits) throw new BadRequestException('The user with email ' + data.email + ' is alredy used');

    const findByUserNameExists = await this.userRepository.findByName(data.name);

    if(findByUserNameExists) throw new BadRequestException('The user with name ' + data.name + ' is alredy used');

    const role_ids : string[] = [];
    const default_role = await this.rolRepository.findByName('default_user');

    if(!default_role) throw new ApplicationException('Error to create user');

    role_ids.push(default_role.getId());

    const createdUser = await this.userRepository.save({
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
      name: data.name,
    }, role_ids);

    if(!createdUser) throw new ApplicationException('Error to create user');

    const newPerson = await this.personRepository.save({
      ...data.personData!,
      id_user: createdUser.getId()
    });

    if(newPerson) {
      let avatarDefault : FileEntity | null = null;
      if(data.personData!.sex === 'M') {
        avatarDefault = await this.fileRepository.getDefaultAvatar('user_avatar_man_default');
      } else if(data.personData!.sex === 'F') {
        avatarDefault = await this.fileRepository.getDefaultAvatar('user_avatar_women_default');
      } else {
        avatarDefault = await this.fileRepository.getDefaultAvatar('user_avatar_any_default');
      }
      await this.userRepository.updateAvatar(avatarDefault!.getId(), createdUser.getId());
    }

    // Activate user
    await this.userRepository.setUserAsVerified(createdUser.getId());

    await this.saveLog(user.getId(), user.getUserName(), timer.stop(), data);
    return await this.userRepository.findById(createdUser.getId()); 
  }
}