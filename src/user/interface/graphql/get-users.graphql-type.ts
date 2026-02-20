import { Field, ObjectType } from "@nestjs/graphql";
import { UserGraphQL } from "./user.graphql-type";

@ObjectType()
export class GetUsersGraphQL {
  @Field(() => [UserGraphQL])
  users: UserGraphQL[];

  @Field(() => Number)
  total: number;
}