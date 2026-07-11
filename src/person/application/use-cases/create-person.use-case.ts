import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreatePersonInput } from "../dto/create-person.input";
import { PersonRepositoryPort } from "src/person/domain/ports/person-repository.port";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { FileRepositoryPort } from "src/files/domain/ports/file-repository.port";
import { FileEntity } from "src/files/domain/entities/file.entity";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { Timer } from "src/common/domain/timing/timer";

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject('PersonRepository')
    private readonly personRepository: PersonRepositoryPort,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort,
    private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logsService.log({
      user_id,
			user_name,
			action: 'Create Person',
			module: 'person',
			resource: 'CreatePersonUseCase',
			description: 'User create person',
			result: 'success',
			duration: duration,
    }, {...payload});
  }

  async execute(createPersonInput: CreatePersonInput, user: User) {
    const timer = Timer.create();
    const isExists = await this.personRepository.findByUserId(createPersonInput.id_user);
    
    if(isExists) {
      throw new BadRequestException(`Person with user ID ${createPersonInput.id_user} already exists.`);
    }

    const userExists = await this.userRepository.existsById(createPersonInput.id_user);
    if(!userExists) {
      throw new BadRequestException(`User with ID ${createPersonInput.id_user} does not exist.`);
    }

    const newPerson = await this.personRepository.save(createPersonInput);

    if(newPerson) {
      let avatarDefault : FileEntity | null = null;
      if(createPersonInput.sex === 'M') {
        avatarDefault = await this.fileRepository.getDefaultAvatar('user_avatar_man_default');
        this.userRepository.updateAvatar(avatarDefault?.getId() || '', createPersonInput.id_user);
      } else {
        avatarDefault = await this.fileRepository.getDefaultAvatar('user_avatar_women_default');
        this.userRepository.updateAvatar(avatarDefault?.getId() || '', createPersonInput.id_user);
      }
    }
    await this.saveLog(user.id, user.getUserName(), timer.stop(), createPersonInput);
    return newPerson;
  }
}