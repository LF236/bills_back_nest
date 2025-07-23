import { Permission } from "../entities/permission.entity";

export interface IPermissionRepository {
	create(createPermissionInput: any) : Promise<Permission>;
	findByName(name: string) : Promise<Permission | null>;
	findAll() : Promise<Permission[]>;
	findOne(id: string) : Promise<Permission>;
	update(id: string, updatePermissionInput: any) : Promise<Permission>;
	delete(id: string) : Promise<void>;
	findByIds(ids: string[]) : Promise<Permission[]>;
}
