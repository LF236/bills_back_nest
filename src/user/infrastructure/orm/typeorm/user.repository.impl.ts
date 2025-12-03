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
			password,
			name
		} = user;
		
		const newUser = await this.repo.save({
			email: email,
			password: hashSync(password, 10),
			name: name,
			is_active: true,
			roles: rols.map( id => ({ id }) )
		});

		return User.createFromObj(newUser);
	}

	async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<User[]> {
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

		return results;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repo.findOneBy({ email: email });
		if(!user) return null;
		return User.createFromObj(user);	
	}

	async findByName(name: string): Promise<User | null> {
		const user = await this.repo.findOneBy({ name: name });
		if(!user) return null;
		return User.createFromObj(user);
	}	

	async findById(id: string): Promise<User | null> {
		const query = this.repo.createQueryBuilder('user')
			.leftJoinAndSelect('user.roles', 'role', 'role.is_active = :is_active AND (role.deleted_at IS NULL OR role.id IS NULL)', { is_active: true })
			.where('user.id = :id', { id });

		const user = await query.getOne();
		
		if(!user) return null;

		const roles : Rol[] = [];
		for(const role of user.roles) {
			const rolEntity = Rol.createFromObj(role);
			roles.push(rolEntity);
		}
		const userEntity = User.createFromObj(user);
		userEntity.setRoles(roles);

		return userEntity;
	}

	async setUserAsVerified(id: string): Promise<boolean> {
		const query = await this.repo.createQueryBuilder()
			.update(UserOrmEntity)
			.set({ verified_at: new Date(), is_active: true })
			.where('id = :id', { id })
			.execute();

		if(!query.affected) return false;
		return query.affected > 0;
	}

	async existsById(id: string): Promise<boolean> {
		const userExists = await this.repo.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.getExists();

		return userExists;
	}

	async deleteAllUsers(): Promise<void> {
		await this.repo.createQueryBuilder()
			.delete()
			.where({})
			.execute();
	}
}
