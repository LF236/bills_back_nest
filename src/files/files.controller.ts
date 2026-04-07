import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidatorHelper } from './infrastructure/helpers/image-validator.helper';
import { saveImageWithUserIdHelper } from './infrastructure/helpers/save-image-with-user-id.helper';
import { CreateFileDto } from './application/dtos/create-file.dto';
import { CreateFileUseCase } from './application/use-cases/create-file.use-case';

@Controller('files')
export class FilesController {
  constructor(
    private readonly createFileUseCase: CreateFileUseCase
  ) {};

  @Post('upload/avatar')
  @GplAuthDecorator('admin', 'default_user')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: imageValidatorHelper,
    storage: saveImageWithUserIdHelper,
  }))
  async uploadUserImage(
    @GetUserDecorator() user: User,
    @UploadedFile() file: Express.Multer.File
  ) {
    if(!file) {
      throw new BadRequestException('Invalid file type. Only images are allowed.')
    }

    const relativePath = file.path.split('static')[1];

    const data : CreateFileDto = {
      name: file.filename,
      extension: file.mimetype.split('/')[1],
      path: relativePath,
      type: 'user_avatar'
    };

    const fileCreated = await this.createFileUseCase.execute(data);
    return fileCreated;
  }
}
