import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMagicLinkInput {
    @Field(() => String)
    token: string;

    @Field(() => String)
    user_id: string;

    @Field(() => Date)
    expires_at: Date;
}