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

    async findByToken(token: string): Promise<MaginLinkEntity | null> {
        const query = await this.repo.createQueryBuilder('magic_link')
            .where('magic_link.token = :token', { token })
            .getOne();

        if(!query) return null;

        return MaginLinkEntity.createFromObj(query);
    }

    async markedTokenAsUsed(token: string): Promise<boolean> {
        const query = await this.repo.createQueryBuilder()
            .update(MagicLinkOrmEntity)
            .set({ used_at: new Date() })
            .where('token = :token', { token })
            .execute();
            
        if(!query.affected) return false;
        return query.affected > 0;
    }

    async findLastTokenByUserId(user_id: string): Promise<MaginLinkEntity | null> {
        const query = await this.repo.createQueryBuilder('magic_link')
            .where('magic_link.user_id = :user_id', { user_id })
            .orderBy('magic_link.created_at', 'DESC')
            .getOne();

        if(query) return MaginLinkEntity.createFromObj(query);
        return null;
    }

    async dropAllToken(): Promise<void> {
        await this.repo.createQueryBuilder()
            .delete()
            .from(MagicLinkOrmEntity)
            .execute();
    }
}