import { Controller, Get, Param, Post } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ValidateMagicLinkDto } from './application/dto/validate-magic-link.dto';
import { ValidateMagicLinkUseCase } from './application/use-cases/validate-magic-link.use-case';
import { RequestNewTokenDto } from './application/dto/request-new-token.dto';
import { RequestMagicLinkUseCase } from './application/use-cases/request-magic-link.use-case';

@Controller('magic-link')
export class MagicLinkController {
    constructor(
        private readonly validateMagicLinkUseCase: ValidateMagicLinkUseCase,
        private readonly requestMagicLinkUseCase: RequestMagicLinkUseCase
    ) {};

    @Post('validate')
    validateMagicLink(
        @Args() validateMagicLinkDto: ValidateMagicLinkDto
    ) {
        return this.validateMagicLinkUseCase.execute(validateMagicLinkDto.token);
    }

    @Post('request_new_token')
    requestNewToken(
        @Args() requestNewTokenDto: RequestNewTokenDto
    ) {
        return this.requestMagicLinkUseCase.execute(requestNewTokenDto);
    }
}
