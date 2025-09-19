import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { PermissionOrmEntity } from "./permission.orm-entity";
import { Repository } from "typeorm";
import { Permission } from "src/permissions/domain/entities/permission.entity";
import { CreatePermissionInput } from "src/permissions/application/dto/inputs/create-permission.input";
import { PaginationArgs } from "src/common/application/dto/args/pagination.args";
import { SearchArgs } from "src/common/application/dto/args/search.args";
import { throws } from "assert";
import { Rol } from "src/rols/domain/entities/rol.entity";

@Injectable()
export class PermissionOrmRepositoryImp implements IPermissionRepository {
	constructor(
		@InjectRepository(PermissionOrmEntity)
		private readonly repo: Repository<PermissionOrmEntity>
	) {}

	async create(permissionInput: CreatePermissionInput): Promise<Permission> {
		const { name, description } = permissionInput;		
		let newPermission = this.repo.create({
			name,
			description
		});

		newPermission = await this.repo.save(newPermission);

		return Permission.createFromObj(newPermission);	
	}

	async findAll(pagination: PaginationArgs, searchArgs: SearchArgs): Promise<Permission[]> {
		const { limit, offset } = pagination;
		const { search } = searchArgs;

		const query = this.repo.createQueryBuilder('permissions')
			.take(limit)
			.skip(offset);

		query.leftJoinAndSelect('permissions.roles', 'roles');

		if( search ) {
            query.where('permissions.name ILIKE :search', { search: `%${search.trim()}%` });
		}
		
		const permissions = await query.getMany();

		const permissionEntities = permissions.map(permission => {
			let roles: Rol[] = [];
			if (permission.roles && permission.roles.length > 0) {
				roles = permission.roles.map(roleOrm => Rol.createFromObj(roleOrm));
			}
			const entity = Permission.createFromObj(permission);
			entity.setRoles(roles);
			return entity;
		});

		return permissionEntities;
	}

	async count(searchArgs: SearchArgs) : Promise<number> {
		const { search } = searchArgs;

		const query = this.repo.createQueryBuilder('permissions')
			.select('COUNT(permissions.id)', 'count');

		if( search ) {
			query.where('permissions.name ILIKE :search', { search: `%${search.trim()}%` });
		}

		const result = await query.getRawOne();
		return parseInt(result.count, 10);
	}

	async findByName(name: string): Promise<Permission | null> {
		const permissionEntity = await this.repo.findOne({ where: { name } });
		if (!permissionEntity) {
			return null;
		}
		return Permission.createFromObj(permissionEntity);
	}	

	async delete(id: string): Promise<void> {
		// Implement the logic to delete a permission by ID
		throw new Error("Method not implemented.");
	}

	async update(id: string, permissionInput: any): Promise<Permission> {
		// Implement the logic to update a permission
		throw new Error("Method not implemented.");
	}

	async findByIds(ids: string[]): Promise<Permission[]> {
		// Implement the logic to find permissions by multiple IDs
		let permissions = await this.repo.createQueryBuilder('permissions')
			.where('permissions.id IN (:...ids)', { ids })
			.getMany();

		return permissions.map(permission => Permission.createFromObj(permission));
	}

	async findOne(id: string): Promise<Permission | null> {
		const query = await this.repo.createQueryBuilder('permissions')
			.where('permissions.id = :id', { id })
			.leftJoinAndSelect('permissions.roles', 'roles')
			.getOne();

		if(!query) return null;

		console.log(query);

		const permissionEntity = Permission.createFromObj(query);
		if(query.roles && query.roles.length > 0) {
			const roles = query.roles.map(item => Rol.createFromObj(item));
			permissionEntity.setRoles(roles);
		}

		return permissionEntity;
	}
}
