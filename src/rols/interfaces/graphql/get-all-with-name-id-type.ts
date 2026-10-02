import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetAllWithNameIdTypeGraphql {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  constructor(id: string, name: string, description: string | null = null) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public static createFromObj(data: any) : GetAllWithNameIdTypeGraphql {
    return new GetAllWithNameIdTypeGraphql(
      data.id,
      data.name,
      data.description
    );
  }
}