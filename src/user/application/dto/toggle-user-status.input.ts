import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ToggleUserStatusInput {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => Boolean, { nullable: false })
  status: boolean;
}