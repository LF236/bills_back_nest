import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";
import { CreateUserInput } from "../dto/create-user.input";
import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository 
	) {};

	async execute(data: CreateUserInput) : Promise<UserGraphQL> {
		return {
			id: "1",
			email: "jow@gmail.com",
			is_active: true,
			roles: ["admin", "user"]
		}
	}
}
