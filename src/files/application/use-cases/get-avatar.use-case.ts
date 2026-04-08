import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FileRepositoryPort } from "src/files/domain/ports/file-repository.port";
import * as path from 'path';
@Injectable()
export class GetAvatarUseCase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort
  ) {};

  async execute(file_id: string) : Promise<string> {
    const file = await this.fileRepository.find(file_id);
    if(!file) {
      throw new NotFoundException('Avatar not found');
    }

    const abolute_path = path.join(process.cwd(), 'static', file.path);
    return abolute_path;
  }
}