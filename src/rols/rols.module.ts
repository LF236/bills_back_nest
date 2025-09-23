import { Module } from '@nestjs/common';
import { RolsService } from './rols.service';
import { RolsResolver } from './rols.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RolOrmEntity } from './infrastructure/orm/typeorm/rol.orm-entity';
import { RolOrmRepositoryImpl } from './infrastructure/orm/typeorm/rol.repository.impl';
import { CreateRolUseCase } from './application/use-cases/create-rol.use-case';
import { FindOneRolUseCase } from './application/use-cases/find-one-rol.use-case';
import { UpdateRolUseCase } from './application/use-cases/update-rol.use-case';
import { GetRolesUseCase } from './application/use-cases/get-roles.use-case';
import { DeleteRolUseCase } from './application/use-cases/delete-rol.use-case';

@Module({
	providers: [
		RolsResolver, 
		RolsService,

		{
			provide: 'RolRepository',
			useClass: RolOrmRepositoryImpl
		},

		// Use Cases
		CreateRolUseCase,
		FindOneRolUseCase,
		UpdateRolUseCase,
		GetRolesUseCase,
		DeleteRolUseCase
	],
	imports: [
		TypeOrmModule.forFeature([RolOrmEntity, Rol]),
		PermissionsModule
	],
	exports: [
		RolsService,
		TypeOrmModule,
		'RolRepository'
	]
})
export class RolsModule {}
