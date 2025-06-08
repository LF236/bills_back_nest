import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBillInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
