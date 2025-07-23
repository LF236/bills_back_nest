import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PermissionGraphQL {
	@Field(() => ID)	
	id: string;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => Boolean, { defaultValue: true })
	is_active: boolean;

	@Field(() => Date, { defaultValue: new Date() })
	created_at: Date;

	@Field(() => Date, { defaultValue: new Date() })
	updated_at: Date;

	@Field(() => Date, { nullable: true, defaultValue: null })
	deleted_at: Date | null;

	@Field(() => [String], { nullable: true })
	roles?: string[];
}
