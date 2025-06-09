import { Equals, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SingUpDto {
	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(
		/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
		{
			message: 'The password must be a UpperCase, lowercase and a number'
		}
	)
	password: string;

	@IsString()
	confirmPassword: string;
}
