import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RequestNewTokenDto } from "../dto/request-new-token.dto";
import { MagicLinkRepositoryPort } from '../../domain/ports/magic-link-repository.port';
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { UuidGeneratorPort } from "src/common/domain/port/uuid-generator.port";
import { SendValidationEmailUseCase } from "src/email/application/use-cases/send-validation-email.use-case";
import { CreatemagicLinkUseCase } from "./create-magic-link.use-case";

@Injectable()
export class RequestMagicLinkUseCase {
    constructor(
        @Inject('MagicLinkRepository')
        private readonly magicLinkRepository: MagicLinkRepositoryPort,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('UuidGeneratorPort')
        private readonly uuidGenerator: UuidGeneratorPort,
        private readonly sendValidationEmailUseCase: SendValidationEmailUseCase,
        private readonly createMagicLinkUseCase: CreatemagicLinkUseCase
                
    ) {};

    async execute(requestNewTokenDto: RequestNewTokenDto) {
        const user = await this.userRepository.findByEmail(requestNewTokenDto.email);
        if(!user) {
            throw new BadRequestException('This request is invalid');
        }

        if(user.verified_at && user.is_active === true) {
            throw new BadRequestException('This user is already verified');
        }

        const lastToken = await this.magicLinkRepository.findLastTokenByUserId(user.id);
        if(lastToken && !lastToken.tokenIsExpired()) {
            throw new BadRequestException('You must wait until the current token expires');
        }

        const token = await this.createMagicLinkUseCase.execute({
            user_id: user.getId(),
            expires_at: new Date(Date.now() + 1000 * 60 * 15),
            token: this.uuidGenerator.generate()
        });

        await this.sendValidationEmailUseCase.execute(
            user.getEmail(),
            'Renew your validation token',
            ``,
            'validate-email.template.js',
            token.getToken()
        );

        return {
            message: 'A new validation token has been sent to your email'
        }
    }
}