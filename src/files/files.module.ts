import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FileRepositoryImpl } from './infrastructure/orm/typeorm/file.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileOrmEntity } from './infrastructure/orm/typeorm/file.orm.entity';
import { CreateFileUseCase } from './application/use-cases/create-file.use-case';
import { UserModule } from 'src/user/user.module';
import { GetAvatarUseCase } from './application/use-cases/get-avatar.use-case';
import { CreateCleanFileUseCase } from './application/use-cases/create-clean-file.use-case';

@Module({
  controllers: [FilesController],
  providers: [
    {
      provide: 'FileRepository',
      useClass: FileRepositoryImpl
    },
    // uses cases
    CreateFileUseCase,
    GetAvatarUseCase,
    CreateCleanFileUseCase
  ],

  imports: [
    TypeOrmModule.forFeature([FileOrmEntity]),
    UserModule
  ],

  exports: [
    TypeOrmModule,
    'FileRepository',
    CreateCleanFileUseCase
  ]
})
export class FilesModule {}
