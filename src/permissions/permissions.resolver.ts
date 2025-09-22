import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';
import { PaginationArgs } from 'src/common/application/dto/args/pagination.args';
import { SearchArgs } from 'src/common/application/dto/args/search.args';
import { CreatePermissionUseCase } from './application/uses-cases/crate-permission.use-case';
import { PermissionGraphQL } from './interface/graphql/permission.graphql-type';
import { CreatePermissionInput } from './application/dto/inputs/create-permission.input';
import { GetPermissionsUseCase } from './application/uses-cases/get-permissions.use-case';
import { GetPermissionsGraphQL } from './interface/graphql/get-permissions.graphql-type';
import { GetOnePermissionUseCase } from './application/uses-cases/get-one-permission.use-case';
import { UpdatePermissionInput } from './application/dto/inputs/update-permission.input';
import { UpdatePermissionUseCase } from './application/uses-cases/update-permission.use-case';
import { DeletePermissionUseCase } from './application/uses-cases/delete-permission.use-case';

@Resolver(() => PermissionGraphQL)
export class PermissionsResolver {
	constructor(
		private readonly createPermissionUseCase: CreatePermissionUseCase,
		private readonly getPermissionsUseCase: GetPermissionsUseCase,
		private readonly getOnePermissionUseCase: GetOnePermissionUseCase,
		private readonly updatePermissionUseCase: UpdatePermissionUseCase,
		private readonly deletePermissionUseCase: DeletePermissionUseCase
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

	@Mutation(() => PermissionGraphQL)
	updatePermission(
		@Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput
	) {
		return this.updatePermissionUseCase.execute(updatePermissionInput);
	}
	
	@Mutation(() => Boolean)
	async removePermission(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string
	) : Promise<Boolean> {
		const isDeleted = await this.deletePermissionUseCase.execute(id);
		return isDeleted;
	}
}
