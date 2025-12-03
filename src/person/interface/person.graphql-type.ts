import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sex } from 'src/common/domain/enums/sex.enum';

@ObjectType()
export class PersonGraphqlType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String, { nullable: true })
  second_last_name: string | null;

  @Field(() => Sex)
  sex: Sex;

  @Field(() => Date, { nullable: true })
  birh_date: Date | null;

  @Field(() => String, { nullable: true })
  curp: string | null;

  @Field(() => String, { nullable: true })
  rfc: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;

  constructor(data: any) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.second_last_name = data.second_last_name ?? null;
    this.sex = data.sex;
    this.birh_date = data.birh_date ?? null;
    this.curp = data.curp ?? null;
    this.rfc = data.rfc ?? null;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at ?? null;
  }
}