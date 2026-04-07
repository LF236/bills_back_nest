import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidatorHelper } from './infrastructure/helpers/image-validator.helper';
import { diskStorage } from 'multer';
import { saveImageWithUserIdHelper } from './infrastructure/helpers/save-image-with-user-id.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/avatar')
  @GplAuthDecorator('admin', 'default_user')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: imageValidatorHelper,
    storage: saveImageWithUserIdHelper,
  }))
  uplaodUserImage(
    @GetUserDecorator() user: User,
    @UploadedFile() file: Express.Multer.File
  ) {
    if(!file) {
      throw new BadRequestException('Invalid file type. Only images are allowed.')
    }

    return 'upload user image';
  }
}
