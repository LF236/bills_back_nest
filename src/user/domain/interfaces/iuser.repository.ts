import { CreateUserInput } from "src/user/application/dto/create-user.input";
import { User } from "../entities/user.entity";
import { PaginationArgs } from "src/common/dtos/args/pagination.args";
import { SearchArgs } from "src/common/dtos/args/search.args";

export interface IUserRepository {
	save(user: CreateUserInput, rols: string[] ) : Promise<User>;
	findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<User[]>;
	findByEmail(email: string) : Promise<User | null>;
	findByName(name: string) : Promise<User | null>;
	setUserAsVerified(id: string) : Promise<boolean>;
	findById(id: string) : Promise<User | null>;
	deleteAllUsers(): Promise<void>;
}
