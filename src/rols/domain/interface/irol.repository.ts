import { Rol } from "src/rols/entities/rol.entity";

export interface IRolRepository {
    create(createRolInput: any) : Promise<Rol>;
}