import { CreateMagicLinkInput } from "src/magic-linik/application/dto/create-magic-link.input";
import { MaginLinkEntity } from "../entities/magin-link.entity";

export interface MagicLinkRepositoryPort {
    create(maginLinkInput: CreateMagicLinkInput): Promise<MaginLinkEntity>;
    findByToken(token: string) : Promise<MaginLinkEntity | null>;
    markedTokenAsUsed(token: string) : Promise<boolean>;
    findLastTokenByUserId(user_id: string) : Promise<MaginLinkEntity | null>;
    dropAllToken(): Promise<void>;
}