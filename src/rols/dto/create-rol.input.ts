import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRolInput {
	
	@Field(() => String)
	@IsNotEmpty()
	name: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	description?: string;

	@Field(() => Boolean, { defaultValue: true })
	@IsBoolean()
	@IsOptional()
	is_active?: boolean;
}
