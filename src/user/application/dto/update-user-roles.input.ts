import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserRolesInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => [ID])
  @IsArray()
  @IsUUID('all', { each: true })
  rolesIds: string[];
}