import { Controller, Post, Body } from '@nestjs/common';
import { SigInDto } from './application/dto/signin.dto';
import { SignInUseCase } from './application/use-cases/signin.use-case';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly signInUseCase: SignInUseCase
	) {};

	@Post('signin')
	signIn(
		@Body() signInDto: SigInDto
	) {
		return this.signInUseCase.execute(signInDto);
	}
}
