import { CreateRolInput } from './create-rol.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRolInput extends PartialType(CreateRolInput) {
	@Field(() => ID)
	id: string;
}
