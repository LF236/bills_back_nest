import { Module } from '@nestjs/common';
import { RolsService } from './rols.service';
import { RolsResolver } from './rols.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RolOrmEntity } from './infrastructure/orm/typeorm/rol.orm-entity';

@Module({
	providers: [
		RolsResolver, RolsService
	],
	imports: [
		TypeOrmModule.forFeature([RolOrmEntity, Rol]),
		PermissionsModule
	],
	exports: [
		RolsService,
		TypeOrmModule
	]
})
export class RolsModule {}
