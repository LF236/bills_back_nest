import { Field, ID, ObjectType } from "@nestjs/graphql";
import { RolsGraphql } from "src/rols/interfaces/graphql/rols.graphql-type";

@ObjectType()
export class PermissionGraphQL {
	@Field(() => ID)	
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	description: string | null;

	@Field(() => Boolean, { defaultValue: true })
	is_active: boolean;

	@Field(() => Date, { defaultValue: new Date() })
	created_at: Date;

	@Field(() => Date, { defaultValue: new Date() })
	updated_at: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	deleted_at: Date | null;

	@Field(() => [RolsGraphql])
	roles: RolsGraphql[];

	constructor(data: any) {
		this.id = data.id;
		this.name = data.name;
		this.description = data.description ?? null;
		this.is_active = data.is_active;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.deleted_at = data.deleted_at ?? null;
		if(data.roles) {
			this.roles = data.roles.map((role: any) => new RolsGraphql(
				role.id,
				role.name,
				role.description,
				role.is_active,
				role.created_at,
				role.updated_at,
				role.deleted_at,
			));
		} else {
			this.roles = [];
		}
	}
}
