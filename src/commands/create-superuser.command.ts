import { Injectable } from "@nestjs/common";
import { info } from "console";
import { Command, Option } from "nestjs-command";
import { AuthService } from "src/auth/auth.service";
import { SingUpDto } from "src/auth/dto/singup.dto";
//import { UserService } from "src/user/user.service";

// TODO: Uncomment the UserService import when you have it implemented
@Injectable()
export class CreateSuperuserCommand {
	constructor(
		//private readonly userService: UserService
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

	) {
		const singupDto = new SingUpDto();
		singupDto.email = email;
		singupDto.password = password;
		singupDto.confirmPassword = password;
		//const user = await this.userService.create(singupDto, true);

		
	}
}
