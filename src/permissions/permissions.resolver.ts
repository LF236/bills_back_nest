import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { PaginationArgs } from 'src/common/application/dto/args/pagination.args';
import { SearchArgs } from 'src/common/application/dto/args/search.args';
import { Permission } from './domain/entities/permission.entity';
import { CreatePermissionUseCase } from './application/uses-cases/crate-permission.use-case';
import { PermissionGraphQL } from './interface/graphql/permission.graphql-type';
import { CreatePermissionInput } from './application/dto/inputs/create-permission.input';
import { GetPermissionsUseCase } from './application/uses-cases/get-permissions.use-case';
import { GetPermissionsGraphQL } from './interface/graphql/get-permissions.graphql-type';
import { GetOnePermissionUseCase } from './application/uses-cases/get-one-permission.use-case';

@Resolver(() => PermissionGraphQL)
export class PermissionsResolver {
	constructor(
		private readonly createPermissionUseCase: CreatePermissionUseCase,
		private readonly getPermissionsUseCase: GetPermissionsUseCase,
		private readonly getOnePermissionUseCase: GetOnePermissionUseCase
	) {};
	
	@Mutation(() => PermissionGraphQL)
	createPermission(
		@Args('createPermissionInput') createPermissionInput: CreatePermissionInput
	) {
		return this.createPermissionUseCase.execute(createPermissionInput);
	}

	@Query(() => GetPermissionsGraphQL, { name: 'permissions' })
	async findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs
	) {
		const { items, total } = await this.getPermissionsUseCase.execute(paginationArgs, searchArgs);
		return {
			items: items,
			total: total
		}
	}

	@Query(() => PermissionGraphQL, { name: 'permission' })
	findOne(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string
	) {
		return this.getOnePermissionUseCase.execute(id);
	}
	
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
