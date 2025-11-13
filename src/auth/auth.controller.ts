import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { SigInDto } from './application/dto/signin.dto';
import { SignInUseCase } from './application/use-cases/signin.use-case';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDecorator } from './infraestructure/decorators/get-user.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRoleGuard } from './infraestructure/guards/user-role.guard';
import { RoleProtectedDecorator } from './infraestructure/decorators/role-protected.decorator';
import { AuthDecorator } from './infraestructure/decorators/auth.decorator';
import { SingUpDto } from './application/dto/singup.dto';
import { CreateUserUseCase } from 'src/user/application/uses-cases/create-user.use-case';
import { CreateUserInput } from 'src/user/application/dto/create-user.input';

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
	signUp(
		@Body() signUpDto: SingUpDto
	) {
		const dto = signUpDto as CreateUserInput;
		return this.createUserUseCase.execute(dto);
	}
}
