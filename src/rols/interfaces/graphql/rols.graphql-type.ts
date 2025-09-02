import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PermissionGraphQL } from "src/permissions/interface/graphql/permission.graphql-type";

@ObjectType()
export class RolsGraphql {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	description: string | null;

	@Field(() => Boolean)
	is_active: boolean;

	@Field(() => Date)
	created_at: Date;

	@Field(() => Date)
	updated_at: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	deleted_at: Date | null;

	@Field(() => [String], { nullable: true })
	users?: string[];

	@Field(() => [PermissionGraphQL], { nullable: true })
	permissions?: PermissionGraphQL[];


	constructor(
		id: string,
		name: string,
		description: string | null = null,
		is_active: boolean = true,
		created_at: Date = new Date(),
		updated_at: Date = new Date(),
		deleted_at: Date | null = null,
		users?: string[] | null,
		permissions?: PermissionGraphQL[] | null
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.is_active = is_active;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.deleted_at = deleted_at;
		this.users = users || [];
		this.permissions = permissions || [];
	}
}
