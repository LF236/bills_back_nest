import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";
import { CreateUserInput } from "../dto/create-user.input";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository 
	) {};

	async execute(data: CreateUserInput) : Promise<UserGraphQL> {
		const exists = await this.userRepository.findByEmail(data.email);
		if (exists) {
			throw new BadRequestException("User already exists with this email");
		}

		const createdUser = await this.userRepository.save(data);
		return createdUser.getGraphQLType();
	}
}
