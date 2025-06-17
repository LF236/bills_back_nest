import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field(() => String, { nullable: false })
	@IsString()
	email: string;
	
	@Field(() => String, { nullable: false })
	@IsString()
	password: string;
}
