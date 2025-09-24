import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolsModule } from 'src/rols/rols.module';
import { UserOrmEntity } from './infrastructure/orm/typeorm/user.orm-entity';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';
import { UserOrmRepository } from './infrastructure/orm/typeorm/user.repository.impl';
import { FindAllUsersUseCase } from './application/uses-cases/find-all-users.use-case';

@Module({
	providers: [
		UserResolver,
		{
			provide: 'UserRepository',
			useClass: UserOrmRepository
		},
		// Use cases
		CreateUserUseCase,
		FindAllUsersUseCase
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
