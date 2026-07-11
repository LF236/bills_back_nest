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
import { Audit } from 'src/logs/infrastructure/decorators/audit.decorator';
import { GplAuthDecorator } from 'src/auth/infraestructure/decorators/gpl-auth.decorator';
import { User } from 'src/user/domain/entities/user.entity';
import { GetUserDecorator } from 'src/auth/infraestructure/decorators/get-user.decorator';

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
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'permissions',
		action: 'Create Permission',
		resource: 'PermissionResolver',
		description: 'Admin Create Permission'
	})
	createPermission(
		@Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
		@GetUserDecorator() user: User
	) {
		return this.createPermissionUseCase.execute(createPermissionInput, user);
	}

	@Query(() => GetPermissionsGraphQL, { name: 'permissions' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'permissions',
		action: 'Get Permissions',
		resource: 'PermissionResolver',
		description: 'Admin Get Permissions'
	})
	async findAll(
		@Args() paginationArgs: PaginationArgs,
		@Args() searchArgs: SearchArgs,
		@GetUserDecorator() user: User
	) {
		const { items, total } = await this.getPermissionsUseCase.execute(paginationArgs, searchArgs, user);
		return {
			items: items,
			total: total
		}
	}

	@Query(() => PermissionGraphQL, { name: 'permission' })
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'permissions',
		action: 'Get One Permission',
		resource: 'PermissionResolver',
		description: 'Admin Get One Permissions'		
	})
	findOne(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
		@GetUserDecorator() user: User
	) {
		return this.getOnePermissionUseCase.execute(id, user);
	}

	@Mutation(() => PermissionGraphQL)
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'permissions',
		action: 'Update Permission',
		resource: 'PermissionResolver',
		description: 'Admin Update Permission'				
	})
	updatePermission(
		@Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
		@GetUserDecorator() user: User
	) {
		return this.updatePermissionUseCase.execute(updatePermissionInput, user);
	}
	
	@Mutation(() => Boolean)
	@GplAuthDecorator('admin', 'default_user')
	@Audit({
		module: 'permissions',
		action: 'Delete Permission',
		resource: 'PermissionResolver',
		description: 'Admin Delete Permission'				
	})	
	async removePermission(
		@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
		@GetUserDecorator() user: User
	) : Promise<Boolean> {
		const isDeleted = await this.deletePermissionUseCase.execute(id, user);
		return isDeleted;
	}
}
