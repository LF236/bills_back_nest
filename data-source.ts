import 'dotenv/config';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Rol } from 'src/rols/entities/rol.entity';
import { UserOrmEntity } from 'src/user/infrastructure/orm/typeorm/user.orm-entity';
import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_NAME || 'mydatabase',
	entities: [UserOrmEntity, Permission, Rol],
	migrations: ['migrations/*.ts'],
	synchronize: false
})
