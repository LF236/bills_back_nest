import { BadRequestException, Controller, Get, Param, ParseUUIDPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidatorHelper } from './infrastructure/helpers/image-validator.helper';
import { saveImageWithUserIdHelper } from './infrastructure/helpers/save-image-with-user-id.helper';
import { CreateFileDto } from './application/dtos/create-file.dto';
import { CreateFileUseCase } from './application/use-cases/create-file.use-case';
import { GetAvatarUseCase } from './application/use-cases/get-avatar.use-case';
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';

@Controller('files')
export class FilesController {
  constructor(
    private readonly createFileUseCase: CreateFileUseCase,
    private readonly getAvatarUseCase: GetAvatarUseCase
  ) {};

  @Post('upload/avatar')
  @GplAuthDecorator('admin', 'default_user')
  @Audit({
    module: 'files',
		action: 'Upload Avatar',
		resource: 'FilesController',
		description: 'Admin Upload Avatar File'
  })
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

    const fileCreated = await this.createFileUseCase.execute(data, user);
    return fileCreated;
  }

  @Get('/avatar/:id')
  @GplAuthDecorator()
    @Audit({
    module: 'files',
		action: 'Get Avatar',
		resource: 'FilesController',
		description: 'Get Avatar File'
  })
  async getFile(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUserDecorator() user: User,
    @Res() res
  ) {
    const path = await this.getAvatarUseCase.execute(id, user);
    
    res.sendFile(path);
  } 
}
