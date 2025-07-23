import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreatePermissionInput {
	@Field(() => String)
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	description?: string;

	@Field(() => Boolean, { nullable: true })
	@IsOptional()
	@IsBoolean()
	is_active?: boolean;
}
