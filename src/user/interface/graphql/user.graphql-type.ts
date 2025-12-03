import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RolsGraphql } from "src/rols/interfaces/graphql/rols.graphql-type";

@ObjectType()
export class UserGraphQL {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	email: string;
	
	@Field(() => Boolean)
	is_active: boolean;

	@Field(() => [RolsGraphql])
	roles: RolsGraphql[];

	constructor(id: string, name: string, email: string, is_active: boolean, roles: RolsGraphql[]) {
		this.id = id;
		this.email = email;
		this.is_active = is_active;
		this.roles = roles;
		this.name = name;
	}
}
