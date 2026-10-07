import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminResendRenewEmailGraphqlType {
  @Field(() => String)
  message: string;
}