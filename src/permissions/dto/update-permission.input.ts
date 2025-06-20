import { CreatePermissionInput } from './create-permission.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
	@Field(() => ID)
	id: string;

}
