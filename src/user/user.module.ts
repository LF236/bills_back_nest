import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolsModule } from 'src/rols/rols.module';

@Module({
	providers: [UserResolver, UserService],
	imports: [
		TypeOrmModule.forFeature([ User ]),
		RolsModule
	],
	exports: [
		UserService,
		TypeOrmModule
	]
})
export class UserModule {}
