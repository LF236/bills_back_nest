import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolInput } from './dto/create-rol.input';
import { UpdateRolInput } from './dto/update-rol.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RolsService {
	constructor(
		@InjectRepository(Rol)
		private readonly roleRepository: Repository<Rol>, 
		private readonly permissionsService: PermissionsService
	) {};

	async create(createRolInput: CreateRolInput) : Promise<Rol> {
		const rol = await this.findOneByName(createRolInput.name.trim());
		if(rol) throw new BadRequestException(`Role with name ${createRolInput.name} already exists`);
		
		const { permissions = [], ...rest } = createRolInput;

		// Validate permissions
		const permissionsEntities : Permission[] = [];


		if(permissions && permissions.length > 0) {
			const permissionsFound = await this.permissionsService.findByIds(permissions);
			if(permissionsFound.length !== permissions.length) {
				const notFoundPermissions = permissions.filter(p => !permissionsFound.some(pf => pf.id === p));
				throw new BadRequestException(`Permissions with ids ${notFoundPermissions.join(', ')} not found`);
			}
			permissionsEntities.push(...permissionsFound);
		}

		const role = this.roleRepository.create({
			...rest,
			permissions: permissionsEntities
		});

		const createdRole = await this.roleRepository.save(role);

		return createdRole;
	}

	async findOneByName(name: string) : Promise<Rol | null> {
		const query = this.roleRepository.createQueryBuilder('rol')
			.where('UPPER(rol.name) = UPPER(:name)', { name: name.toUpperCase() });
		return query.getOne();
	}

  
	async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs) : Promise<Rol[]> {
		const { limit, offset } = paginationArgs;
		const { search } = searchArgs;

		const query = this.roleRepository.createQueryBuilder('rol')
			.take(limit)
			.skip(offset);

		if (search) {
			query.where('UPPER(rol.name) LIKE UPPER(:search)', { search: `%${search.toUpperCase()}%` })
		}
		return query.getMany();
	}

	async findOne(id: string) : Promise<Rol> {
		const rol = await this.roleRepository.findOneBy({ id });
		if (!rol) {
			throw new BadRequestException(`Role with id ${id} not found`);
		}
		return rol;		
	}

	async findByIds(ids: string[]) : Promise<Rol[]> {
		if (!ids || ids.length === 0) {
			return [];
		}

		const query = this.roleRepository.createQueryBuilder('rol')
			.where('rol.id IN (:...ids)', { ids });

		const res = await query.getMany();

		if(res.length !== ids.length) {
			const notFoundIds = ids.filter(id => !res.some(rol => rol.id === id));
			throw new BadRequestException(`Roles with ids ${notFoundIds.join(', ')} not found`);
		}

		return res;
	}

	async update(id: string, updateRolInput: UpdateRolInput) : Promise<Rol> {
		const role = await this.findOne(id);
		const { permissions = [], ...rest } = updateRolInput;

		// Validate permissions
		if (permissions && permissions.length > 0) {
			const permissionsFound = await this.permissionsService.findByIds(permissions);
			if (permissionsFound.length !== permissions.length) {
				const notFoundPermissions = permissions.filter(p => !permissionsFound.some(pf => pf.id === p));
				throw new BadRequestException(`Permissions with ids ${notFoundPermissions.join(', ')} not found`);
			}

			role.permissions = permissionsFound;
		} else {
			role.permissions = [];
		}

		Object.assign(role, rest);

		return await this.roleRepository.save(role);
	}

	async remove(id: string) : Promise<Rol> {
		const role = await this.findOne(id);
		
		const query = this.roleRepository.createQueryBuilder()
			.update()
			.set({ is_active: false })
			.where('id = :id', { id });

		await query.execute();

		return {
			...role,
			is_active: false
		};
	}
}
