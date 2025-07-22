import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

export class UserOrmRepository implements IUserRepository {
	async save(user: any): Promise<any> {
		throw new Error("Method not implemented.");
	}

	async findAll(): Promise<any[]> {
		throw new Error("Method not implemented.");
	}

	async findByEmail(email: string): Promise<any | null> {
		throw new Error("Method not implemented.");
	}
}
