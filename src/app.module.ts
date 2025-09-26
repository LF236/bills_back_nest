import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RolsModule } from './rols/rols.module';
import { PermissionsModule } from './permissions/permissions.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { SeedModule } from './seed/seed.module';
import { CommandModule } from 'nestjs-command';
import { CreateSuperuserCommand } from './commands/create-superuser.command';
import { AuthService } from './auth/auth.service';
import { UserOrmEntity } from './user/infrastructure/orm/typeorm/user.orm-entity';
import { PermissionOrmEntity } from './permissions/infrastructure/orm/typeorm/permission.orm-entity';
import { RolOrmEntity } from './rols/infrastructure/orm/typeorm/rol.orm-entity';
import { EmailModule } from './email/email.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MagicLinkOrmEntity } from './magic-linik/infraestructure/orm/typeorm/magic-link.orm-entity';
import { MagicLinkModule } from './magic-linik/magic-link.module';
import { CommonModule } from './common/common.module';
@Module({
	imports: [
		ConfigModule.forRoot(),
		BillModule, 
		UserModule, 
		AuthModule,
		CommonModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST || 'localhost',
			port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
			username: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'password',
			database: process.env.DB_NAME || 'mydatabase',
			entities: [UserOrmEntity, PermissionOrmEntity, RolOrmEntity, MagicLinkOrmEntity],
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

		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),


		RolsModule,
		PermissionsModule,
		SeedModule,
		CommandModule,
		EmailModule,
		MagicLinkModule
	],
	providers: [
		AppService,
		// COMMANDS
		CreateSuperuserCommand
	],
	exports: [],
})
export class AppModule {}
