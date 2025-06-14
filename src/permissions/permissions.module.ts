import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
	providers: [PermissionsResolver, PermissionsService],
	imports: [
		TypeOrmModule.forFeature([Permission]),
	],
	exports: [
		PermissionsService
	]
})
export class PermissionsModule {}
