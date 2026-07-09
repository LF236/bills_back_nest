import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { SigInDto } from './application/dto/signin.dto';
import { SignInUseCase } from './application/use-cases/signin.use-case';
import { SingUpDto } from './application/dto/singup.dto';
import { CreateUserUseCase } from 'src/user/application/uses-cases/create-user.use-case';
import { CreateUserInput } from 'src/user/application/dto/create-user.input';
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly signInUseCase: SignInUseCase,
		private readonly createUserUseCase: CreateUserUseCase
	) {};

	@Post('signin')
	signIn(
		@Body() signInDto: SigInDto
	) {
		return this.signInUseCase.execute(signInDto);
	}

	@Post('signup')
	@Audit({
		action: 'Auth Login',
		module: 'Auth',
		description: 'User-Create-Account',
		resource: 'auth.controller'
	})
	signUp(
		@Body() signUpDto: SingUpDto
	) {
		const dto = signUpDto as CreateUserInput;
		return this.createUserUseCase.execute(dto);
	}
}
