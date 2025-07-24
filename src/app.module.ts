import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RolsModule } from './rols/rols.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Rol } from './rols/entities/rol.entity';
import { Permission } from './permissions/entities/permission.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { CommandModule } from 'nestjs-command';
import { CreateSuperuserCommand } from './commands/create-superuser.command';
import { AuthService } from './auth/auth.service';
import { UserOrmEntity } from './user/infrastructure/orm/typeorm/user.orm-entity';
import { PermissionOrmEntity } from './permissions/infrastructure/orm/typeorm/permission.orm-entity';
import { RolOrmEntity } from './rols/infrastructure/orm/typeorm/rol.orm-entity';
@Module({
	imports: [
		ConfigModule.forRoot(),
		BillModule, 
		UserModule, 
		AuthModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST || 'localhost',
			port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
			username: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'password',
			database: process.env.DB_NAME || 'mydatabase',
			entities: [UserOrmEntity, PermissionOrmEntity, RolOrmEntity],
			synchronize: false	
		}),

		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			useFactory: async () => ({
				autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
				playground: false,		
				plugins: [
					ApolloServerPluginLandingPageLocalDefault({ embed: true })
				]
			})
		}),


		RolsModule,
		PermissionsModule,
		CommonModule,
		SeedModule,
		CommandModule
	],
	providers: [
		AppService,
		// COMMANDS
		CreateSuperuserCommand
	],
	exports: [],
})
export class AppModule {}
