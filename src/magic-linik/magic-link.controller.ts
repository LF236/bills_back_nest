import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('magic-link')
export class MagicLinkController {
    @Post('validate')
    validateMaginLink(

    ) {
        return 'This action returns all cats';
    }
}
