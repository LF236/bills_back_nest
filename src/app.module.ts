import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { RolsModule } from './rols/rols.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Rol } from './rols/entities/rol.entity';
import { Permission } from './permissions/entities/permission.entity';
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
			entities: [User, Rol, Permission],
			synchronize: false	
		}),
		RolsModule,
		PermissionsModule
	],
	providers: [AppService],
})
export class AppModule {}
