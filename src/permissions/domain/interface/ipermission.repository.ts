import { CreatePermissionInput } from "src/permissions/application/dto/inputs/create-permission.input";
import { Permission } from "../entities/permission.entity";

export interface IPermissionRepository {
	create(createPermissionInput: CreatePermissionInput) : Promise<Permission>;
	findByName(name: string) : Promise<Permission | null>;
	findAll() : Promise<Permission[]>;
	findOne(id: string) : Promise<Permission>;
	update(id: string, updatePermissionInput: any) : Promise<Permission>;
	delete(id: string) : Promise<void>;
	findByIds(ids: string[]) : Promise<Permission[]>;
}
