import { CreateBillInput } from './create-bill.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBillInput extends PartialType(CreateBillInput) {
  @Field(() => Int)
  id: number;
}
