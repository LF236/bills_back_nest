import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CreateFileDto } from 'src/files/application/dtos/create-file.dto';
import { CreateCleanFileUseCase } from 'src/files/application/use-cases/create-clean-file.use-case';
import { FileEntity } from 'src/files/domain/entities/file.entity';

const DEFAULT_IMAGES : CreateFileDto[] = [
  {
    name: 'man_default',
    extension: 'svg',
    path: '/default_images/man.svg',
    type: 'user_avatar_man_default'
  },
  {
    name: 'woman_default',
    extension: 'svg',
    path: '/default/images/women.svg',
    type: 'user_avatar_women_default'
  },
  {
    name: 'any_default',
    extension: 'jpg',
    path: '/default/images/cat.jpg',
    type: 'user_avatar_any_default'
  }
]

@Injectable()
export class AddDefaultImagesCommand {
  constructor(
    private readonly createFileUseCase: CreateCleanFileUseCase
  ) {};

  @Command({
    command: 'add:default-images',
    describe: 'Add default images to the system',
  })

  async createDefaultImages() {
    try {
      let arr_promises : Promise<FileEntity>[] = [];

      for (const image of DEFAULT_IMAGES) {
        arr_promises.push(this.createFileUseCase.execute(image));
      }

      await Promise.all(arr_promises);
      console.log('Default images added successfully');

      process.exit(0);
    } catch (err) {
      console.log(err);
      console.log('Error creating default images:', err.message);
      process.exit(1);
    }
  }
}