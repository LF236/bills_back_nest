import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserGraphQL {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	email: string;
	
	@Field(() => Boolean)
	is_active: boolean;

	@Field(() => [String])
	roles: string[];
}
