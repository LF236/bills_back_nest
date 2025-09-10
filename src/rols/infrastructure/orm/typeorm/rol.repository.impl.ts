import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { RolOrmEntity } from "./rol.orm-entity";
import { Repository } from "typeorm";
import { CreateRolInput } from "src/rols/dto/create-rol.input";
import { Rol } from 'src/rols/domain/entities/rol.entity';

@Injectable()
export class RolOrmRepositoryImpl implements IRolRepository {
    
    constructor(
        @InjectRepository(RolOrmEntity)
        private readonly repo: Repository<RolOrmEntity>
    ) {};
    
    async create(createRolInput: CreateRolInput): Promise<Rol> {
        const { name, description, is_active, permissions } = createRolInput;
        let newRol = this.repo.create({
            name,
            description,
            is_active,
            permissions: permissions?.map( id => ({ id }) ) || []
        });

        newRol = await this.repo.save(newRol);

        return Rol.createFromObj(newRol);
    }
}