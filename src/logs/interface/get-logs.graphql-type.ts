import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LogGraphqlType } from './log.graphql-type';

@ObjectType()
export class GetLogsGraphQL {
  @Field(() => [ LogGraphqlType ])
  items: LogGraphqlType[];

  @Field(() => Int)
  total: number;
}