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
		return this.authService.createUser(singUpDto);
	}
  
}
