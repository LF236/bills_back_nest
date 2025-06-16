import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Rol } from 'src/rols/entities/rol.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
	constructor(
		@InjectRepository(Rol)
		private readonly rolRepository: Repository<Rol>,

		@InjectRepository(Permission)
		private readonly permissionRepository: Repository<Permission>,

		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		private readonly permissionService: PermissionsService
	) {};

	async seedDatabase() : Promise<boolean> {
		await this.deleteDatabase();
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
		for(const permission of SEE)
	}
}
