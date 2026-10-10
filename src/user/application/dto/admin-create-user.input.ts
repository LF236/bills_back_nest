import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AdminCreatePersonInput } from 'src/person/application/dto/admin-create-person.input';

@InputType()
export class AdminCreateUserInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  password: string;

  @Field(() => String, { nullable: false })
  @IsString()
  name: string;

  @Field(() => AdminCreatePersonInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminCreatePersonInput)
  personData?: AdminCreatePersonInput;
}