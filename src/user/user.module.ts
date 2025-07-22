import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolsModule } from 'src/rols/rols.module';
import { UserOrmEntity } from './infrastructure/orm/typeorm/user.orm-entity';

@Module({
	providers: [UserResolver],
	imports: [
		RolsModule,
		TypeOrmModule.forFeature([UserOrmEntity])
	],
	exports: [
		TypeOrmModule
	]
})
export class UserModule {}
