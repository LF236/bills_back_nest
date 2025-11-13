import { UserGraphQL } from "src/user/interface/graphql/user.graphql-type";
import { CreateUserInput } from "../dto/create-user.input";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/user/domain/interfaces/iuser.repository";
import { IRolRepository } from "src/rols/domain/interface/irol.repository";
import { SendEmailUseCase } from "src/email/application/use-cases/send-email.use-case";
import { CreatemagicLinkUseCase } from "src/magic-linik/application/use-cases/create-magic-link.use-case";
import { UuidGeneratorPort } from "src/common/domain/port/uuid-generator.port";
import { SendValidationEmailUseCase } from "src/email/application/use-cases/send-validation-email.use-case";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@Inject('RolRepository')
		private readonly rolsRepository: IRolRepository,
		@Inject('UuidGeneratorPort')
		private readonly uuidGenerator: UuidGeneratorPort,
		private readonly sendValidationEmailUseCase: SendValidationEmailUseCase,
		private readonly createMagicLinkUseCase: CreatemagicLinkUseCase
	) {};

	async execute(data: CreateUserInput) : Promise<UserGraphQL> {
		const exists = await this.userRepository.findByEmail(data.email);
		if (exists) {
			throw new BadRequestException("User already exists with this email");
		}

		const findByName = await this.userRepository.findByName(data.name);
		if (findByName) {
			throw new BadRequestException("User already exists with this name");
		}

		let role_ids : string[] = [];
		const default_role = await this.rolsRepository.findByName('default_user');

		if(default_role) role_ids.push(default_role.getId());

		const createdUser = await this.userRepository.save(data, role_ids);
		if(createdUser) {
			const token = await this.createMagicLinkUseCase.execute({
				user_id: createdUser.getId(),
				expires_at: new Date(Date.now() + 1000 * 60 * 15),
				token: this.uuidGenerator.generate()
			});

			await this.sendValidationEmailUseCase.execute(
				createdUser.getEmail(),
				'Welcome to Our Service',
				``,
				'validate-email.template.js',
				token.getToken()
			);
		}
		return createdUser.getGraphQLType();
	}
}
