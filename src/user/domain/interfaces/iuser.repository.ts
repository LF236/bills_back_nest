import { CreateUserInput } from "src/user/application/dto/create-user.input";
import { User } from "../entities/user.entity";

export interface IUserRepository {
	save(user: CreateUserInput) : Promise<User>;
	findAll(): Promise<User[]>;
	findByEmail(email: string) : Promise<User | null>;
	deleteAllUsers(): Promise<void>;
}
