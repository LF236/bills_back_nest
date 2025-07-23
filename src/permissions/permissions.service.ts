import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { CreatePermissionInput } from './application/dto/inputs/create-permission.input';
import { UpdatePermissionInput } from './application/dto/inputs/update-permission.input';
CreatePermissionInput
@Injectable()
export class PermissionsService {
	constructor(
		@InjectRepository(Permission)
		private readonly permissionRepository: Repository<Permission>,
		
	) {};
	
	
	async create(createPermissionInput: CreatePermissionInput) : Promise<Permission> {
		const { ...rest } = createPermissionInput;
		
		// Validte if permission exists
		const existingPermission = await this.findByName(rest.name);
		if (existingPermission) {
			throw new Error(`Permission with name ${rest.name} already exists`);
		}	

		const permission = this.permissionRepository.create(rest);
		return this.permissionRepository.save(permission);
	}

	async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs) : Promise<Permission[]> {
		const { limit, offset } = paginationArgs;
		const { search } = searchArgs;

		const query = this.permissionRepository.createQueryBuilder('permission')
			.take(limit)
			.skip(offset);


		if (search) {
			query.where('UPPER(permission.name) ILIKE UPPER(:search)', { search: `%${search}%` });
		}
		return query.getMany();
	}

	async findOne(id: string) : Promise<Permission> {
		const permission = await this.permissionRepository.findOneBy({ id });
		if (!permission) {
			throw new Error(`Permission with id ${id} not found`);
		}
		return permission;
	}

	async findByName(name: string) : Promise<Permission | null> {
		const query = this.permissionRepository.createQueryBuilder('permission')
			.where('UPPER(permission.name) = UPPER(:name)', { name: name.toUpperCase() });
		return query.getOne();
	}

	async update(id: string, updatePermissionInput: UpdatePermissionInput): Promise<Permission>{
		await this.findOne(id);
		const { ...rest } = updatePermissionInput;
		await this.permissionRepository.createQueryBuilder()
			.update()
			.set(rest)
			.where('id = :id', { id })
			.execute();
	
		return this.findOne(id);
	}

	async remove(id: string) :Promise<Permission> {
		const permission = await this.findOne(id);
	
		await this.permissionRepository.createQueryBuilder()
			.update()
			.set({ is_active: false })
			.where('id = :id', { id })
			.execute();

		return {
			...permission,
			is_active: false
		};
	}


	async findByIds(ids: string[]) : Promise<Permission[]> {
		if (!ids || ids.length === 0) return [];
		const query = this.permissionRepository.createQueryBuilder('permission')
			.where('permission.id IN (:...ids)', { ids });

		return await query.getMany();
	}
}
