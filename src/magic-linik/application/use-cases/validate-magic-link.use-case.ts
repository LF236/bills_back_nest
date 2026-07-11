import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Timer } from "src/common/domain/timing/timer";
import { LogsService } from "src/logs/logs.service";
import { MagicLinkRepositoryPort } from "src/magic-linik/domain/ports/magic-link-repository.port";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class ValidateMagicLinkUseCase {
    constructor(
        @Inject('MagicLinkRepository')
        private readonly magicLinkRepository: MagicLinkRepositoryPort,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string | null = null, user_name: string = '', time: number = 0, token: string) {
        await this.logsService.log({
            user_id: user_id,
            user_name: user_name,
            action: 'Validate Magic Link',
            module: 'magic_link',
            resource: 'MagicLinkController',
            description: 'UserFailToValidateAccount',
            result: 'success',
            duration: time
        }, {
            token: token
        })
    }

    async execute(token: string) : Promise<{ valid: boolean, email: string }> {
        const timer = Timer.create();
        const tokenQuery = await this.magicLinkRepository.findByToken(token);
        if(!tokenQuery) throw new BadRequestException('Token is invalid');
        if(tokenQuery.tokenIsExpired()) throw new BadRequestException('Token is expired please request a new one');
        if(tokenQuery.isUsed()) throw new BadRequestException('Token has already been used, please contact support');
        await this.magicLinkRepository.markedTokenAsUsed(token);
        await this.userRepository.setUserAsVerified(tokenQuery['user_id']);
        const user = await this.userRepository.findById(tokenQuery['user_id']);
        await this.saveLog(user?.id, user?.name, timer.stop(), token )
        return {
            valid: true,
            email: user!.email
        }
    }
}