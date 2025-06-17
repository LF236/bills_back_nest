import { BadRequestException, Injectable } from '@nestjs/common';
import { SingUpDto } from './dto/singup.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
	
	constructor(
		private readonly userService: UserService
	) {};

	async createUser(singUpDto: SingUpDto) {
		const {password, confirmPassword} = singUpDto;
		if (password !== confirmPassword) {
			throw new BadRequestException({
				statusCode: 400,
				message: 'Bad Request',
				errors: {
					confirmPassword: ['Passwords do not match'],
				},
			})
		}

		const user = await this.userService.create(singUpDto);
		

	}
}
