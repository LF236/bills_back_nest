import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionOrmEntity } from './infrastructure/orm/typeorm/permission.orm-entity';
import { PermissionOrmRepositoryImp } from './infrastructure/orm/typeorm/permission.repository.impl';
import { CreatePermissionUseCase } from './application/uses-cases/crate-permission.use-case';
import { GetPermissionsUseCase } from './application/uses-cases/get-permissions.use-case';

@Module({
	providers: [
		PermissionsResolver, 
		PermissionsService,

		{
			provide: 'PermissionRepository',
			useClass: PermissionOrmRepositoryImp
		},

		// Use Cases
		CreatePermissionUseCase,
		GetPermissionsUseCase
	],
	imports: [
		TypeOrmModule.forFeature([PermissionOrmEntity]),
	],
	exports: [
		PermissionsService,
		TypeOrmModule,
		'PermissionRepository'
	]
})
export class PermissionsModule {}
