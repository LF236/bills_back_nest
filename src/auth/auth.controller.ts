import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { SigInDto } from './application/dto/signin.dto';
import { SignInUseCase } from './application/use-cases/signin.use-case';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDecorator } from './infraestructure/decorators/get-user.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRoleGuard } from './infraestructure/guards/user-role.guard';
import { RoleProtectedDecorator } from './infraestructure/decorators/role-protected.decorator';
import { AuthDecorator } from './infraestructure/decorators/auth.decorator';

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

	// @Get('test2')
	// @AuthDecorator('admin', 'super-user', 'default_user')
	// test2(
	// 	@GetUserDecorator() user: User
	// ) {
	// 	return {
	// 		user
	// 	};
	// }
}
