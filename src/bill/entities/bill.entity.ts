import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Bill {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
