import { User } from "../entities/user.entity";

export interface UserRepository {
	save(user: User) : Promise<User>;
	findAll(): Promise<User[]>;
	findByEmail(email: string) : Promise<User | null>;
}
