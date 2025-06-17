import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Rol } from 'src/rols/entities/rol.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_PERMISSIONS, SEED_ROLES } from './data/data';
import { RolsService } from 'src/rols/rols.service';

@Injectable()
export class SeedService {
	constructor(
		@InjectRepository(Rol)
		private readonly rolRepository: Repository<Rol>,

		@InjectRepository(Permission)
		private readonly permissionRepository: Repository<Permission>,

		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		private readonly permissionService: PermissionsService,
		private readonly rolService: RolsService
	) {};

	async seedDatabase() : Promise<boolean> {
		await this.deleteDatabase();
		await this.createPermissions();
		await this.createRolSuperAdmin();
		await this.createRolDefaultUser();
		return true;
	}

	
	private async deleteDatabase() : Promise<void> {
		// Delete rols
		await this.rolRepository.createQueryBuilder()
			.delete()
			.from(Rol)
			.execute();
		
		// Delete permissions
		await this.permissionRepository.createQueryBuilder()
			.delete()
			.where({})
			.execute();

		// Delete users
		await this.userRepository.createQueryBuilder()
			.delete()
			.where({})
			.execute();
	}

	private async createPermissions() : Promise<void> {
		for(const permission of SEED_PERMISSIONS) {
			await this.permissionService.create(permission);
		}
	}

	private async createRolSuperAdmin() : Promise<void> {
		const super_user = SEED_ROLES.find(rol => rol.name === 'super_admin');

		if(super_user) {
			const rol = await this.rolService.create(super_user);
				
			if(!rol) {
				throw new Error('Error creating super admin role');
			}

			let permissions = await this.permissionRepository.find();
			const ids_permissions : string[] = permissions.map(item => item.id);
	
			await this.rolService.update(rol.id, {
				id: rol.id,	
				permissions: ids_permissions
			});
		}		
	}

	private async createRolDefaultUser() : Promise<void> {
		const default_user = SEED_ROLES.find(rol => rol.name === 'default_user');
		if(default_user) {
			const rol = await this.rolService.create(default_user);
			if(!rol) {
				throw new Error('Error creating default user role');
			}

			const defaul_permission = await this.permissionService.findByName('view_dashboard');
			if(!defaul_permission) {
				throw new Error('Default permission not found');
			}

			await this.rolService.update(rol.id, {
				id: rol.id,
				permissions: [defaul_permission.id]
			});		
		}
	}
}
