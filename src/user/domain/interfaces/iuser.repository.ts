import { User } from "../entities/user.entity";

export interface IUserRepository {
	save(user: User) : Promise<User>;
	findAll(): Promise<User[]>;
	findByEmail(email: string) : Promise<User | null>;
}
