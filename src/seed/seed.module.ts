import { Module } from '@nestjs/common';
import { SeedResolver } from './seed.resolver';
import { RolsModule } from 'src/rols/rols.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UserModule } from 'src/user/user.module';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	providers: [
		SeedResolver,
		SeedService
	],
	imports: [
		ConfigModule,
		RolsModule,
		PermissionsModule,
		UserModule
	]
})
export class SeedModule {}
