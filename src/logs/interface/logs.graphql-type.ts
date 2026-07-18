import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogsGraphqlType {
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

  description

  result

  message_error

  ip

  user_agent

  method_http

  route

  request_id

  duration

  created_at

  updated_at

  browser

  browser_version

  os

  device

  metadata
}