import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PaginationArgs } from 'src/common/dtos/args/pagination.args';
import { SearchArgs } from 'src/common/dtos/args/search.args';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Permission)
export class PermissionsResolver {
	constructor(private readonly permissionsService: PermissionsService) {}

	@Mutation(() => Permission)
	createPermission(
		@Args('createPermissionInput') createPermissionInput: CreatePermissionInput
	) {
		console.log(createPermissionInput);
		return this.permissionsService.create(createPermissionInput);
	}

	@Query(() => [Permission], { name: 'permissions' })
	findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs
	) {
		return this.permissionsService.findAll(paginationArgs, searchArgs);
	}

	@Query(() => Permission, { name: 'permission' })
	findOne(@Args('id', { type: () => ID }) id: string) {
		return this.permissionsService.findOne(id);
	}

	@Mutation(() => Permission)
	updatePermission(@Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput) {
		return this.permissionsService.update(updatePermissionInput.id, updatePermissionInput);
	}


	@Mutation(() => Permission)
	async removePermission(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string
	) : Promise<Permission> {
		return this.permissionsService.remove(id);
	}
}
