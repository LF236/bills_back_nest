import { CreateRolInput } from "src/rols/dto/create-rol.input";
import { Rol } from "src/rols/domain/entities/rol.entity";
import { UpdateRolInput } from "src/rols/dto/update-rol.input";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";

export interface IRolRepository {
    get(pagionationArgs: PaginationArgs, searchArgs: SearchArgs) : Promise<Rol[]>;
    count(searchArgs: SearchArgs) : Promise<number>;
    create(createRolInput: CreateRolInput) : Promise<Rol>;
    findOne(id: string) : Promise<Rol | null>;
    update(updateRolInput: UpdateRolInput) : Promise<Rol>;
    delete(id: string) : Promise<boolean>;
    validateIfRolExistsByName(name: string) : Promise<boolean>;
    dropAllRols() : Promise<void>;
    findByName(name: string) : Promise<Rol | null>;
}