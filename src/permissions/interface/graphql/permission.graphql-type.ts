import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Permission } from "src/permissions/domain/entities/permission.entity";

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

	@Field(() => [String], { nullable: true })
	roles?: string[];

	constructor(
		id: string,
		name: string,
		description: string,
		is_active: boolean = true,
		created_at: Date = new Date(),
		updated_at: Date = new Date(),
		deleted_at: Date | null = null,
		roles?: string[]
	) {
		this.id = id;
		this.name = name;
		this.description = description ?? null;
		this.is_active = is_active;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.deleted_at = deleted_at;
		this.roles = roles || [];
	}
}
