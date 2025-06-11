import 'dotenv/config';
import { User } from "src/user/entities/user.entity";
import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_NAME || 'mydatabase',
	entities: [User],
	migrations: ['migrations/*.ts'],
	synchronize: false
})
