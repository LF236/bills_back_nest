import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Match } from 'src/common/infraestructure/decorators/Match.decorator';

@InputType()
export class CreateUserInput {
	@Field(() => String, { nullable: false })
	@IsString()
	email: string;

	@Field(() => String, { nullable: false })
	@IsString()
	name: string;

	@Field(() => String, { nullable: false })
	@IsString()
	password: string;

	@Field(() => String, { nullable: false })
	@IsString()
	@Match('password', { message: 'Passwords do not match' })
	confirmPassword: string;
}
