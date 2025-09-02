import { Module } from '@nestjs/common';
import { RolsService } from './rols.service';
import { RolsResolver } from './rols.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RolOrmEntity } from './infrastructure/orm/typeorm/rol.orm-entity';
import { RolOrmRepositoryImpl } from './infrastructure/orm/typeorm/rol.repository.impl';
import { CreateRolUseCase } from './application/use-cases/create-rol.use-case';

@Module({
	providers: [
		RolsResolver, 
		RolsService,

		{
			provide: 'RolRepository',
			useClass: RolOrmRepositoryImpl
		},

		// Use Cases
		CreateRolUseCase
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
