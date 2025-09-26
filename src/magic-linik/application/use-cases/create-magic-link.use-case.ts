import { Inject, Injectable } from "@nestjs/common";
import { CreateMagicLinkInput } from "../dto/create-magic-link.input";
import { MagicLinkRepositoryPort } from "src/magic-linik/domain/ports/magic-link-repository.port";
import { MaginLinkEntity } from "src/magic-linik/domain/entities/magin-link.entity";

@Injectable()
export class CreatemagicLinkUseCase {
    constructor(
        @Inject('MagicLinkRepository')
        private readonly magicLinkRepository: MagicLinkRepositoryPort
    ) {};

    async execute(createMagicLinkInput: CreateMagicLinkInput) : Promise<MaginLinkEntity> {
        return this.magicLinkRepository.create(createMagicLinkInput);
    }
}