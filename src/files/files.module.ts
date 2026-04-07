import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FileRepositoryImpl } from './infrastructure/orm/typeorm/file.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileOrmEntity } from './infrastructure/orm/typeorm/file.orm.entity';
import { CreateFileUseCase } from './application/use-cases/create-file.use-case';

@Module({
  controllers: [FilesController],
  providers: [
    {
      provide: 'FileRepository',
      useClass: FileRepositoryImpl
    },
    // uses cases
    CreateFileUseCase
  ],

  imports: [
    TypeOrmModule.forFeature([FileOrmEntity])
  ],

  exports: [
    TypeOrmModule,
    'FileRepository'
  ]
})
export class FilesModule {}
