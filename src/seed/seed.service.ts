import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SEED_PERMISSIONS, SEED_ROLES } from './data/data';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { IPermissionRepository } from 'src/permissions/domain/interface/ipermission.repository';
import { IRolRepository } from 'src/rols/domain/interface/irol.repository';
import { Permission } from 'src/permissions/domain/entities/permission.entity';
import { PermissionOrmEntity } from 'src/permissions/infrastructure/orm/typeorm/permission.orm-entity';

@Injectable()
export class SeedService {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@Inject('RolRepository')
		private readonly rolRepository: IRolRepository,
		@Inject('PermissionRepository')
		private readonly permissionRepository: IPermissionRepository,
	) {};

	async seedDatabase() : Promise<boolean> {
		await this.deleteDatabase();
		await this.createPermissions();
		await this.createRolSuperAdmin();
		await this.createRolDefaultUser();
		return true;
	}
	
	private async deleteDatabase() : Promise<void> {
		// Delete users
		await this.userRepository.deleteAllUsers();
		// Delete rols
		await this.rolRepository.dropAllRols();
		// Delete permissions
		await this.permissionRepository.dropAllPermissions();
	}

	private async createPermissions() : Promise<boolean> {
		const promises : Promise<Permission>[] = [];
		for(const permission of SEED_PERMISSIONS) {
			promises.push(
				this.permissionRepository.create({
					name: permission.name,
					description: permission.description,
				})
			);
		}
		try {
			await Promise.all(promises);
			return true;
		} catch (err) {
			return false;
		}
	}

	private async createRolSuperAdmin() : Promise<void> {
		const super_admin = SEED_ROLES.find(rol => rol.name === 'super_admin');
		if(super_admin) {
			const allPermission = await this.permissionRepository.findAll({
				limit: 100,
				offset: 0,
			}, { search: '' });

			const idsPermission = allPermission.map(permission => permission.getId());

			const rol = await this.rolRepository.create({
				name: super_admin.name,
				description: super_admin.description,
				permissions: idsPermission.map( id => id ),
				is_active: true
			});
		}
	}

	private async createRolDefaultUser() : Promise<void> {
		const default_user = SEED_ROLES.find(rol => rol.name === 'default_user');

		if(default_user) {
			const basicPermission = await this.permissionRepository.findByName('view_dashboard');
			if(!basicPermission) {
				throw new Error('Basic permission not found');
			}
			
			const rol = await this.rolRepository.create({
				name: default_user.name,
				description: default_user.description,
				permissions: [basicPermission.getId()],
				is_active: true
			});
		}
	}
}