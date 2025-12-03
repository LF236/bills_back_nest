import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Sex } from "src/common/domain/enums/sex.enum";

@InputType()
export class CreatePersonInput {
  @Field(() => ID)
  @IsNotEmpty()
  id_user: string;

  @Field(() => String)
  @IsNotEmpty()
  first_name: string;

  @Field(() => String)
  @IsNotEmpty()
  last_name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  second_last_name?: string;

  @Field(() => Sex)
  @IsNotEmpty()
  sex: Sex;

  @Field(() => Date, { nullable: true })
  @IsNotEmpty()
  birth_date?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  curp?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  rfc?: string;
}