import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { ParseUUIDPipe } from '@nestjs/common';
import { Permission } from './domain/entities/permission.entity';
import { CreatePermissionUseCase } from './application/uses-cases/crate-permission.use-case';
import { PermissionGraphQL } from './interface/graphql/permission.graphql-type';
import { CreatePermissionInput } from './application/dto/inputs/create-permission.input';

@Resolver(() => Permission)
export class PermissionsResolver {
	constructor(
		private readonly createPermissionUseCase: CreatePermissionUseCase		
	) {};
	
	@Mutation(() => PermissionGraphQL)
	createPermission(
		@Args('createPermissionInput') createPermissionInput: CreatePermissionInput
	) {
		return this.createPermissionUseCase.execute(createPermissionInput);
	}

	// @Mutation(() => Permission)
	// createPermission(
	// 	@Args('createPermissionInput') createPermissionInput: CreatePermissionInput
	// ) {
	// 	return this.permissionsService.create(createPermissionInput);
	// }
	//
	// @Query(() => [Permission], { name: 'permissions' })
	// findAll(
	// 	@Args() paginationArgs: PaginationArgs,
	// 	@Args() searchArgs: SearchArgs
	// ) {
	// 	return this.permissionsService.findAll(paginationArgs, searchArgs);
	// }
	//
	// @Query(() => Permission, { name: 'permission' })
	// findOne(@Args('id', { type: () => ID }) id: string) {
	// 	return this.permissionsService.findOne(id);
	// }
	//
	// @Mutation(() => Permission)
	// updatePermission(@Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput) {
	// 	return this.permissionsService.update(updatePermissionInput.id, updatePermissionInput);
	// }
	//
	//
	// @Mutation(() => Permission)
	// async removePermission(
	// 	@Args('id', { type: () => ID }, ParseUUIDPipe) id: string
	// ) : Promise<Permission> {
	// 	return this.permissionsService.remove(id);
	// }
}
