import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from "src/user/application/dto/create-user.input";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { Repository } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";
import { User } from "src/user/domain/entities/user.entity";
import { hashSync } from "bcrypt"; 
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";
import { Rol } from "src/rols/domain/entities/rol.entity";

@Injectable()
export class UserOrmRepository implements IUserRepository {
	constructor(
		@InjectRepository(UserOrmEntity)
		private readonly repo: Repository<UserOrmEntity>
	) {};
	
	async save(user: CreateUserInput, rols: string[] = []): Promise<User> {
		const {
			email,
			password
		} = user;
		
		const newUser = await this.repo.save({
			email: email,
			password: hashSync(password, 10),
			is_active: true,
			roles: rols.map( id => ({ id }) )
		});

		return User.createFromObj(newUser);
	}

	async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<any[]> {
		const query = this.repo.createQueryBuilder('user')
			.leftJoinAndSelect('user.roles', 'role')
			.where('role.is_active = :is_active', { is_active: true })
			.andWhere('role.deleted_at IS NULL OR role.id IS NULL');

		
		let data = await query.getMany();
		
		let results : User[] = [];
		for(const user of data) {
			let userEntity = User.createFromObj(user);
			if(user.roles && user.roles.length > 0) {
				let roles = user.roles.map( role => Rol.createFromObj(role) );
				userEntity.setRoles(roles);
			}
			results.push(userEntity);
		}

		console.log(results);

		throw new Error("Method not implemented.");
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repo.findOneBy({ email: email });
		if(!user) return null;
		return User.createFromObj(user);	
	}

	async deleteAllUsers(): Promise<void> {
		await this.repo.createQueryBuilder()
			.delete()
			.where({})
			.execute();
	}
}
