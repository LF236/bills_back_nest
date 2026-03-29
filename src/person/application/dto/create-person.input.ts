import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { PersonTypes } from "src/common/domain/enums/person-types.enum";
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

  @Field(() => PersonTypes, { nullable: false })
  @IsNotEmpty()
  person_type: PersonTypes;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => o.person_type === PersonTypes.moral)
  @IsNotEmpty({ message: 'company_name is required when person_type is moral' })
  company_name?: string;
}