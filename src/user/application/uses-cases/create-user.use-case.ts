import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";
import { CreateUserInput } from "../dto/create-user.input";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@Inject('RolRepository')
		private readonly rolsRepository: IRolRepository
	) {};

	async execute(data: CreateUserInput) : Promise<UserGraphQL> {
		const exists = await this.userRepository.findByEmail(data.email);
		if (exists) {
			throw new BadRequestException("User already exists with this email");
		}

		let role_ids : string[] = [];
		const default_role = await this.rolsRepository.findByName('default_user');

		if(default_role) role_ids.push(default_role.getId());

		const createdUser = await this.userRepository.save(data, role_ids);
		return createdUser.getGraphQLType();
	}
}
