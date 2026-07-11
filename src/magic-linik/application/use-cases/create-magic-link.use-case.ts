import { Inject, Injectable } from "@nestjs/common";
import { CreateMagicLinkInput } from "../dto/create-magic-link.input";
import { MagicLinkRepositoryPort } from "src/magic-linik/domain/ports/magic-link-repository.port";
import { MaginLinkEntity } from "src/magic-linik/domain/entities/magin-link.entity";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/user/domain/entities/user.entity";
import { Timer } from "src/common/domain/timing/timer";

@Injectable()
export class CreatemagicLinkUseCase {
    constructor(
        @Inject('MagicLinkRepository')
        private readonly magicLinkRepository: MagicLinkRepositoryPort,
        private readonly logsService: LogsService
    ) {};

    async saveLog(user_id: string | null, user_name: string | null, duration: number = 0, payload: any) {
        await this.logsService.log({
            user_id: user_id ?? null,
            user_name: user_name ?? 'anonymous',
            action: 'Create Magic Link',
            module: 'magin_link',
            resource: 'CreatemagicLinkUseCase',
            description: 'System generate new token',
            result: 'success',
            duration: duration
        }, {...payload});
    }

    async execute(createMagicLinkInput: CreateMagicLinkInput, user: User | null) : Promise<MaginLinkEntity> {
        const timer = Timer.create();
        const magicLink = await this.magicLinkRepository.create(createMagicLinkInput);
        await this.saveLog(user?.id ?? null, user?.getUserName() ?? 'anonymous', timer.stop(), magicLink.getData())
        return magicLink;
    }
}