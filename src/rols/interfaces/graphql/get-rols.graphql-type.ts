import { Field, ObjectType } from '@nestjs/graphql';
import { RolsGraphql } from './rols.graphql-type';

@ObjectType()
export class GetRolsGraphQL {
  @Field(() => [RolsGraphql])
  items: RolsGraphql[];

  @Field(() => Number)
  total: number;
}