import { IsNotEmpty, IsString } from "class-validator";

export class SigInDto {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}