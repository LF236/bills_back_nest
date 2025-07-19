import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singup.dto';
import { SingInDto } from './dto/singin.dto';
import { PasswordNotMatchError } from 'src/shared/exceptions/password-not-match.error';


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	@Post('signup')
	async create(
		@Body() singUpDto: SingUpDto
	) {
		try {
			return await this.authService.createUser(singUpDto);
		} catch (error) {
			if(error instanceof PasswordNotMatchError) {
				throw new BadRequestException(error.message);
			}

			throw new InternalServerErrorException({
				statusCode: 500,
				message: 'Internal Server Error',
				errors: {
					general: ['An unexpected error occurred'],
				},
			})
		}
	}

	@Post('signin')
	signIn(
		@Body() singInDto: SingInDto
	) {
		return this.authService.singIn(singInDto);
	}
  
}
