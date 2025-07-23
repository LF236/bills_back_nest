import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolsModule } from 'src/rols/rols.module';
import { UserOrmEntity } from './infrastructure/orm/typeorm/user.orm-entity';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';

@Module({
	providers: [
		UserResolver,

		// Use cases
		CreateUserUseCase,

		{
			provide: 'UserRepository',
			useClass: UserOrmEntity
		}
	],
	imports: [
		RolsModule,
		TypeOrmModule.forFeature([UserOrmEntity])
	],
	exports: [
		TypeOrmModule,
		'UserRepository'
	]
})
export class UserModule {}
