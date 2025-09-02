import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { Rol } from "src/rols/entities/rol.entity";
import { RolOrmEntity } from "./rol.orm-entity";
import { Repository } from "typeorm";

@Injectable()
export class RolOrmRepositoryImpl implements IRolRepository {
    
    constructor(
        @InjectRepository(RolOrmEntity)
        private readonly repo: Repository<RolOrmEntity>
    ) {};
    
    create(createRolInput: any): Promise<Rol> {
        // Implementation for creating a Rol entity
        throw new Error("Method not implemented.");
    }
}