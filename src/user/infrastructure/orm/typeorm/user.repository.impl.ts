import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from "src/user/application/dto/create-user.input";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { Repository } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";
import { User } from "src/user/domain/entities/user.entity";
import { hashSync } from "bcrypt"; 

@Injectable()
export class UserOrmRepository implements IUserRepository {
	constructor(
		@InjectRepository(UserOrmEntity)
		private readonly repo: Repository<UserOrmEntity>
	) {};
	
	async save(user: CreateUserInput): Promise<User> {
		const {
			email,
			password
		} = user;
		
		const newUser = await this.repo.save({
			email: email,
			password: hashSync(password, 10)
		});

		return User.createFromObj(newUser);
	}

	async findAll(): Promise<any[]> {
		throw new Error("Method not implemented.");
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repo.findOneBy({ email: email });
		if(!user) return null;
		return User.createFromObj(user);	
	}
}
