import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SEED_PERMISSIONS, SEED_ROLES } from './data/data';
import { IUserRepository } from 'src/user/domain/interfaces/iuser.repository';
import { IPermissionRepository } from 'src/permissions/domain/interface/ipermission.repository';
import { IRolRepository } from 'src/rols/domain/interface/irol.repository';

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
		// await this.createPermissions();
		// await this.createRolSuperAdmin();
		// await this.createRolDefaultUser();
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

	private async createPermissions() : Promise<void> {
		for(const permission of SEED_PERMISSIONS) {
			// await this.permissionService.create(permission);
		}
	}

	private async createRolSuperAdmin() : Promise<void> {
		// const super_user = SEED_ROLES.find(rol => rol.name === 'super_admin');

		// if(super_user) {
		// 	const rol = await this.rolService.create(super_user);
				
		// 	if(!rol) {
		// 		throw new Error('Error creating super admin role');
		// 	}

		// 	let permissions = await this.permissionRepository.find();
		// 	const ids_permissions : string[] = permissions.map(item => item.id);
	
		// 	await this.rolService.update(rol.id, {
		// 		id: rol.id,	
		// 		permissions: ids_permissions
		// 	});
		// }		
	}

	private async createRolDefaultUser() : Promise<void> {
		// const default_user = SEED_ROLES.find(rol => rol.name === 'default_user');
		// if(default_user) {
		// 	const rol = await this.rolService.create(default_user);
		// 	if(!rol) {
		// 		throw new Error('Error creating default user role');
		// 	}

		// 	const defaul_permission = await this.permissionService.findByName('view_dashboard');
		// 	if(!defaul_permission) {
		// 		throw new Error('Default permission not found');
		// 	}

		// 	await this.rolService.update(rol.id, {
		// 		id: rol.id,
		// 		permissions: [defaul_permission.id]
		// 	});		
		// }
	}
}
