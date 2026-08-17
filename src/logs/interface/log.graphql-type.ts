import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { UserGraphQL } from 'src/user/interface/graphql/user.graphql-type';

@ObjectType()
export class LogGraphqlType {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  user_id: string | null;

  @Field(() => String, { nullable: true })
  user_name: string;

  @Field(() => String, { nullable: false })
  action: string;

  @Field(() => String, { nullable: false })
  module: string;

  @Field(() => String, { nullable: false })
  resource: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => String, { nullable: false })
  result: 'success' | 'error' | 'warning';

  @Field(() => String, { nullable: true })
  message_error: string | null;

  @Field(() => String, { nullable: true })
  ip: string | null;

  @Field(() => String, { nullable: true })
  user_agent: string | null;

  @Field(() => String, { nullable: true })
  method_http: string | null;

  @Field(() => String, { nullable: true })
  route: string | null;

  @Field(() => String, { nullable: true })
  request_id: string | null;

  @Field(() => Number, { nullable: true })
  duration: number | null;

  @Field(() => Date, { nullable: false })
  created_at: Date;

  @Field(() => Date, { nullable: false })
  updated_at: Date;

  @Field(() => String, { nullable: true })
  browser: string | null;

  @Field(() => String, { nullable: true })
  browser_version: string | null;

  @Field(() => String, { nullable: true })
  os: string | null;

  @Field(() => String, { nullable: true })
  device: string | null;

  @Field(() => GraphQLJSON, { nullable: false })
  metadata: Record<string, any>

  @Field(() => UserGraphQL, { nullable: true })
  user: UserGraphQL | null;
}