import 'dotenv/config';
import { MagicLinkOrmEntity } from 'src/magic-linik/infraestructure/orm/typeorm/magic-link.orm-entity';
import { PermissionOrmEntity } from 'src/permissions/infrastructure/orm/typeorm/permission.orm-entity';
import { RolOrmEntity } from 'src/rols/infrastructure/orm/typeorm/rol.orm-entity';
import { UserOrmEntity } from 'src/user/infrastructure/orm/typeorm/user.orm-entity';
import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_NAME || 'mydatabase',
	entities: [UserOrmEntity, PermissionOrmEntity, RolOrmEntity, MagicLinkOrmEntity],
	migrations: ['migrations/*.ts'],
	synchronize: false
})


