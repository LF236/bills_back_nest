import { CreateMagicLinkInput } from "src/magic-linik/application/dto/create-magic-link.input";
import { MaginLinkEntity } from "src/magic-linik/domain/entities/magin-link.entity";
import { MagicLinkRepositoryPort } from "src/magic-linik/domain/ports/magic-link-repository.port";
import { MagicLinkOrmEntity } from "./magic-link.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class MaginLickOrmImpl implements MagicLinkRepositoryPort {
    constructor(
        @InjectRepository(MagicLinkOrmEntity)
        private readonly repo: Repository<MagicLinkOrmEntity>
    ) {};


    async create(maginLinkInput: CreateMagicLinkInput): Promise<MaginLinkEntity> {
        let magicLink = this.repo.create(maginLinkInput);
        magicLink = await this.repo.save(magicLink);
        return MaginLinkEntity.createFromObj(magicLink);
    }

    async dropAllToken(): Promise<void> {
        await this.repo.createQueryBuilder()
            .delete()
            .from(MagicLinkOrmEntity)
            .execute();
    }
}