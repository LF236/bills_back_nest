import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('GetOnlyPermission')
export class GetOnlyPermissionGraphQL {
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

    constructor(data: any) {
        this.id = data.id;
		this.name = data.name;
		this.description = data.description ?? null;
		this.is_active = data.is_active;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.deleted_at = data.deleted_at ?? null;
    }
}