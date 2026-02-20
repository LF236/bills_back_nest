import { Injectable } from "@nestjs/common";
import { Command, Option } from "nestjs-command";
import { CreateSuperUserUseCase } from "src/user/application/uses-cases/create-super-user.use-case";

@Injectable()
export class CreateSuperuserCommand {
	constructor(
		private readonly createSuperUserUseCase: CreateSuperUserUseCase
	) {};

	@Command({
		command: 'create:superuser',
		describe: 'Create a superuser with admin privileges',
	})


	async createSuperuser(
		@Option({
			name: 'email',
			describe: 'Email of the superuser',
			type: 'string',
			demandOption: true,
		})
		email: string,
		@Option({
			name: 'password',
			describe: 'Password of the superuser',
			type: 'string',
			demandOption: true,
		})
		password: string,

		@Option({
			name: 'name',
			describe: 'Name of the superuser',
			type: 'string',
			demandOption: false,
		})
		name?: string,
	) {
		
		try {
			let username = name ? name : this.generateUserNameByEmail(email);
			const res = await this.createSuperUserUseCase.execute(email, password, username);
			console.log('Superuser created successfully:', res.getEmail());
			process.exit(0);
		} catch (err) {
			console.error('Error creating superuser:', err.message);
			process.exit(1);
		}
	}

	private generateUserNameByEmail(email: string) : string {
		const namePart = email.split('@')[0];
		return namePart.charAt(0).toLowerCase() + namePart.slice(1);
	}
}
