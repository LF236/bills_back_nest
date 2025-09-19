import { CreatePermissionInput } from "src/permissions/application/dto/inputs/create-permission.input";
import { Permission } from "../entities/permission.entity";
import { PaginationArgs } from "src/common/application/dto/args/pagination.args";
import { SearchArgs } from "src/common/application/dto/args/search.args";

export interface IPermissionRepository {
	create(createPermissionInput: CreatePermissionInput) : Promise<Permission>;
	findByName(name: string) : Promise<Permission | null>;
	findAll(pagination: PaginationArgs, search: SearchArgs) : Promise<Permission[]>;
	count(search: SearchArgs) : Promise<number>;
	findOne(id: string) : Promise<Permission | null>;
	update(id: string, updatePermissionInput: any) : Promise<Permission>;
	delete(id: string) : Promise<void>;
	findByIds(ids: string[]) : Promise<Permission[]>;
}
