import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singup.dto';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	@Post('signup')
	create(
		@Body() singUpDto: SingUpDto
	) {
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

		console.log(singUpDto);
		return 1
	}
  
}
