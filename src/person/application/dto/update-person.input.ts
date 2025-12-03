import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePersonInput } from './create-person.input';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}