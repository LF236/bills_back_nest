import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto } from 'src/files/application/dtos/create-file.dto';
import { FileEntity } from 'src/files/domain/entities/file.entity';
import { FileRepositoryPort } from 'src/files/domain/ports/file-repository.port';
import { FileOrmEntity } from './file.orm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileRepositoryImpl implements FileRepositoryPort {
  constructor(
    @InjectRepository(FileOrmEntity)
    private readonly repo: Repository<FileOrmEntity>
  ) {};

  async save(fileToCreate: CreateFileDto): Promise<FileEntity> {
    const { name, extension, path, type = 'default' } = fileToCreate;
    const newFile = await this.repo.save({
      name,
      extension,
      path,
      type
    });

    return this.find(newFile.id) as Promise<FileEntity>;
  }

  async find(id: string) : Promise<FileEntity | null> {
    const query = await this.repo.createQueryBuilder('file')
      .select(['file.id', 'file.name', 'file.extension', 'file.path', 'file.type'])
      .where('file.id = :id', { id })
      .getOne();

    if(!query) return null;

    return FileEntity.createFromObj(query);
  }

  async getDefaultAvatar(type: string = 'any_default') : Promise<FileEntity | null> {
    const query = await this.repo.createQueryBuilder('file')
      .select(['file.id', 'file.name', 'file.extension', 'file.path', 'file.type'])
      .where('file.type = :type', { type })
      .getOne();

    if(!query) return null;

    return FileEntity.createFromObj(query);
  }
}