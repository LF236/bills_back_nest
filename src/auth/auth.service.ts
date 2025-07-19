import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SingUpDto } from './dto/singup.dto';
import { UserService } from 'src/user/user.service';
import { SingInDto } from './dto/singin.dto';
import { PasswordNotMatchError } from 'src/shared/exceptions/password-not-match.error';
@Injectable()
export class AuthService {
	
	constructor(
		private readonly userService: UserService
	) {};

	async createUser(singUpDto: SingUpDto) {
		const {password, confirmPassword} = singUpDto;
		if (password !== confirmPassword) {
		
			throw new PasswordNotMatchError();
		}

		const user = await this.userService.create({
			...singUpDto,
			is_active: false,
		});
		return user;
	}

	async singIn(singInDto: SingInDto) {
		const { email, password } = singInDto;
		const user = await this.userService.findOneByEmal(email);
		if(!user) {
			throw new NotFoundException({
				statusCode: 404,
				message: 'Not Found',
				errors: {
					email: ['User not found with this email'],
				},
			})
		};

		console.log(user);
		console.log(singInDto);
		return true;
	}
}
