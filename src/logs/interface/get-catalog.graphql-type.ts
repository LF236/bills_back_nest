import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetCatalogGraphQL {
  @Field(() => [String])
  values: string[];
};