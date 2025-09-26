import { CreateMagicLinkInput } from "src/magic-linik/application/dto/create-magic-link.input";
import { MaginLinkEntity } from "../entities/magin-link.entity";

export interface MagicLinkRepositoryPort {
    create(maginLinkInput: CreateMagicLinkInput): Promise<MaginLinkEntity>;
    dropAllToken(): Promise<void>;
}