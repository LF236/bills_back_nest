import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FileEntity } from 'src/files/domain/entities/file.entity';
import { FileRepositoryPort } from 'src/files/domain/ports/file-repository.port';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';

@Injectable()
export class CreateFileUseCase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepositoryPort,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {};

  private static generateSecureUrl(id_image: string): string {
    const url = process.env.UPLOADS_URL || 'http://localhost:3000/api/files/avatar/';
    return `${url}${id_image}`;
  }

  async execute(data: CreateFileDto, user_id: string) : Promise<FileEntity> {
    const newFile = await this.fileRepository.save(data);
    this.userRepository.updateAvatar(newFile.id, user_id);
    const secureUrl = CreateFileUseCase.generateSecureUrl(newFile.id);
    newFile.setSecureUrl(secureUrl);
    return newFile;
  }
}