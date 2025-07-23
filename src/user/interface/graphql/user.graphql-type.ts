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

	constructor(id: string, email: string, is_active: boolean, roles: string[]) {
		this.id = id;
		this.email = email;
		this.is_active = is_active;
		this.roles = roles;
	}
}
