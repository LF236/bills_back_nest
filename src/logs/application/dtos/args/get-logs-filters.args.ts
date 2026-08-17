import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetLogsFiltersArgs {
  @Field(() => String, { nullable: true })
  action?: string;

  @Field(() => String, { nullable: true })
  module?: string;
}