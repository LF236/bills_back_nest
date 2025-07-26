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
}
