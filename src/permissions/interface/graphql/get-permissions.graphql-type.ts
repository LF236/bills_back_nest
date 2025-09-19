import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PermissionGraphQL } from './permission.graphql-type';

@ObjectType()
export class GetPermissionsGraphQL {
    @Field(() => [PermissionGraphQL])
    items: PermissionGraphQL[];

    @Field(() => Int)
    total: number;
}