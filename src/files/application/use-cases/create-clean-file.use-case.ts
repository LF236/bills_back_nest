import { Inject, Injectable } from '@nestjs/common';
import { FileRepositoryPort } from 'src/files/domain/ports/file-repository.port';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FileEntity } from 'src/files/domain/entities/file.entity';

@Injectable()
export class CreateCleanFileUseCase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort
  ) {};

  async execute(data: CreateFileDto) : Promise<FileEntity> {
    const newFile = await this.fileRepository.save(data);
    return newFile;
  }
}