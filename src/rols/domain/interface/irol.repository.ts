import { CreateRolInput } from "src/rols/dto/create-rol.input";
import { Rol } from "src/rols/domain/entities/rol.entity";

export interface IRolRepository {
    create(createRolInput: CreateRolInput) : Promise<Rol>;
}