import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FileEntity } from 'src/files/domain/entities/file.entity';
import { FileRepositoryPort } from 'src/files/domain/ports/file-repository.port';

@Injectable()
export class CreateFileUseCase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort
  ) {};

  async execute(data: CreateFileDto) : Promise<FileEntity> {
    return this.fileRepository.save(data);
  }
}