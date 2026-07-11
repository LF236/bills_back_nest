import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FileEntity } from 'src/files/domain/entities/file.entity';
import { FileRepositoryPort } from 'src/files/domain/ports/file-repository.port';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/user/domain/entities/user.entity';
import { Timer } from 'src/common/domain/timing/timer';

@Injectable()
export class CreateFileUseCase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, payload: any) {
    await this.logsService.log({
      user_id,
			user_name,
			action: 'Upload Avatar',
			module: 'files',
			resource: 'CreateFileUseCase',
			description: 'User Upload Avatar',
			result: 'success',
			duration: duration,
    }, { ...payload });
  }

  private static generateSecureUrl(id_image: string): string {
    const url = process.env.UPLOADS_URL || 'http://localhost:3000/api/files/avatar/';
    return `${url}${id_image}`;
  }

  async execute(data: CreateFileDto, user: User) : Promise<FileEntity> {
    const timer = Timer.create();
    const newFile = await this.fileRepository.save(data);
    this.userRepository.updateAvatar(newFile.id, user.id);
    const secureUrl = CreateFileUseCase.generateSecureUrl(newFile.id);
    newFile.setSecureUrl(secureUrl);
    await this.saveLog(user.id, user.getUserName(), timer.stop(), data);
    return newFile;
  }
}