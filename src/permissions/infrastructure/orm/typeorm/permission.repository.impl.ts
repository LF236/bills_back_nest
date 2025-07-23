import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPermissionRepository } from "src/permissions/domain/interface/ipermission.repository";
import { PermissionOrmEntity } from "./permission.orm-entity";
import { Repository } from "typeorm";
import { Permission } from "src/permissions/domain/entities/permission.entity";

@Injectable()
export class PermissionOrmRepositoryImp implements IPermissionRepository {
	constructor(
		@InjectRepository(PermissionOrmEntity)
		private readonly repo: Repository<PermissionOrmEntity>
	) {}

	async create(permissionInput: any): Promise<Permission> {
		// Implement the logic to save a permission
		throw new Error("Method not implemented.");
	}

	async findAll(): Promise<Permission[]> {
		// Implement the logic to find all permissions
		throw new Error("Method not implemented.");
	}

	async findByName(name: string): Promise<Permission | null> {
		// Implement the logic to find a permission by name
		throw new Error("Method not implemented.");
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
		throw new Error("Method not implemented.");
	}

	async findOne(id: string): Promise<Permission> {
		// Implement the logic to find a permission by ID
		throw new Error("Method not implemented.");
	}
}
