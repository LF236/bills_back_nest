import { Module } from '@nestjs/common';
import { PermissionsResolver } from './permissions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionOrmEntity } from './infrastructure/orm/typeorm/permission.orm-entity';
import { PermissionOrmRepositoryImp } from './infrastructure/orm/typeorm/permission.repository.impl';
import { CreatePermissionUseCase } from './application/uses-cases/crate-permission.use-case';
import { GetPermissionsUseCase } from './application/uses-cases/get-permissions.use-case';
import { GetOnePermissionUseCase } from './application/uses-cases/get-one-permission.use-case';
import { UpdatePermissionUseCase } from './application/uses-cases/update-permission.use-case';
import { DeletePermissionUseCase } from './application/uses-cases/delete-permission.use-case';
import { PermissionsLoader } from './infrastructure/orm/typeorm/loaders/permissions.loader';

@Module({
	providers: [
		PermissionsResolver,
		{
			provide: 'PermissionRepository',
			useClass: PermissionOrmRepositoryImp
		},

		// Use Cases
		CreatePermissionUseCase,
		GetPermissionsUseCase,
		GetOnePermissionUseCase,
		UpdatePermissionUseCase,
		DeletePermissionUseCase,

		// Loaders
		PermissionsLoader
	],
	imports: [
		TypeOrmModule.forFeature([PermissionOrmEntity]),
	],
	exports: [
		TypeOrmModule,
		'PermissionRepository',
		PermissionsLoader
	]
})
export class PermissionsModule {}
