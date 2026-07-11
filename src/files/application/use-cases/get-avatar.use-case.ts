import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FileRepositoryPort } from "src/files/domain/ports/file-repository.port";
import * as path from 'path';
import { LogsService } from "src/logs/logs.service";
import { Timer } from "src/common/domain/timing/timer";
import { User } from "src/user/domain/entities/user.entity";
@Injectable()
export class GetAvatarUseCase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort,
    private readonly logsService: LogsService
  ) {};

  async saveLog(user_id: string, user_name: string, duration: number = 0, file_id: string) {
    await this.logsService.log({
      user_id,
			user_name,
			action: 'Get Avatar',
			module: 'files',
			resource: 'GetAvatarUseCase',
			description: 'User Get Avatar',
			result: 'success',
			duration: duration,
    }, { file_id });
  }

  async execute(file_id: string, user: User) : Promise<string> {
    const timer = Timer.create();
    const file = await this.fileRepository.find(file_id);
    if(!file) {
      throw new NotFoundException('Avatar not found');
    }

    const abolute_path = path.join(process.cwd(), 'static', file.path);
    await this.saveLog(user.id, user.getUserName(), timer.stop(), file_id);
    return abolute_path;
  }
}