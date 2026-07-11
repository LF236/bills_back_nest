import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RequestNewTokenDto } from "../dto/request-new-token.dto";
import { MagicLinkRepositoryPort } from '../../domain/ports/magic-link-repository.port';
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { UuidGeneratorPort } from "src/common/domain/port/uuid-generator.port";
import { SendValidationEmailUseCase } from "src/email/application/use-cases/send-validation-email.use-case";
import { CreatemagicLinkUseCase } from "./create-magic-link.use-case";
import { LogsService } from "src/logs/logs.service";
import { Timer } from "src/common/domain/timing/timer";

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
        private readonly createMagicLinkUseCase: CreatemagicLinkUseCase,
        private readonly logService: LogsService
    ) {};

    async saveLog(user_id: string | null = null, user_name: string = '', time: number = 0, token_generated: string = '') {
        await this.logService.log({
            user_id: user_id,
            user_name: user_name,
            action: 'Generate Magic Link',
            module: 'magin_link',
            resource: 'RequestMagicLinkUseCase',
            description: 'User create new token',
            result: 'success',
            duration: time
        }, {
            token_generated
        })
    }

    async execute(requestNewTokenDto: RequestNewTokenDto) {
        const timer = Timer.create();
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
            token: this.uuidGenerator.generate(),
        }, user);

        await this.sendValidationEmailUseCase.execute(
            user.getEmail(),
            'Renew your validation token',
            ``,
            'validate-email.template.js',
            token.getToken(),
            user
        );

        this.saveLog(user.id, user.getUserName(), timer.stop(), token.getToken());
        return {
            message: 'A new validation token has been sent to your email'
        }
    }
}