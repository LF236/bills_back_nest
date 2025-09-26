import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolsModule } from 'src/rols/rols.module';
import { UserOrmEntity } from './infrastructure/orm/typeorm/user.orm-entity';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';
import { UserOrmRepository } from './infrastructure/orm/typeorm/user.repository.impl';
import { FindAllUsersUseCase } from './application/uses-cases/find-all-users.use-case';
import { EmailModule } from 'src/email/email.module';
import { MagicLinkModule } from 'src/magic-linik/magic-link.module';
import { CommonModule } from 'src/common/common.module';

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
		TypeOrmModule.forFeature([UserOrmEntity]),
		EmailModule,
		MagicLinkModule,
		CommonModule
	],
	exports: [
		TypeOrmModule,
		'UserRepository',
	]
})
export class UserModule {}
