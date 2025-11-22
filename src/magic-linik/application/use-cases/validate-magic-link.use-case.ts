import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { MagicLinkRepositoryPort } from "src/magic-linik/domain/ports/magic-link-repository.port";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class ValidateMagicLinkUseCase {
    constructor(
        @Inject('MagicLinkRepository')
        private readonly magicLinkRepository: MagicLinkRepositoryPort,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) {};

    async execute(token: string) : Promise<{ valid: boolean, email: string }> {
        const tokenQuery = await this.magicLinkRepository.findByToken(token);
        if(!tokenQuery) throw new BadRequestException('Token is invalid');
        if(tokenQuery.tokenIsExpired()) throw new BadRequestException('Token is expired please request a new one');
        if(tokenQuery.isUsed()) throw new BadRequestException('Token has already been used, please contact support');
        await this.magicLinkRepository.markedTokenAsUsed(token);
        await this.userRepository.setUserAsVerified(tokenQuery['user_id']);
        const user = await this.userRepository.findById(tokenQuery['user_id']);
        return {
            valid: true,
            email: user!.email
        }
    }
}